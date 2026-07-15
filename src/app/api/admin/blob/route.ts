import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { useBlobStorage } from "@/lib/cms/blob";

export const runtime = "nodejs";

const ALLOWED = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
] as const;

/**
 * Client-side Vercel Blob upload handshake.
 * Browser uploads directly to Blob — bypasses the ~4.5MB serverless body limit.
 */
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!useBlobStorage()) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN не настроен. Добавьте Storage → Blob в Vercel.",
      },
      { status: 503 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [...ALLOWED],
        maximumSizeInBytes: 100 * 1024 * 1024,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ role: "admin" }),
      }),
      onUploadCompleted: async () => {
        // Token handshake only — no post-processing required.
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Ошибка подготовки загрузки";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

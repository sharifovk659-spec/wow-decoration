import { randomBytes } from "crypto";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { isVercelRuntime, uploadToBlob, useBlobStorage } from "@/lib/cms/blob";
import { isAllowedUpload } from "@/lib/cms/mediaTypes";
import { UPLOADS_DIR, UPLOADS_PUBLIC_PREFIX } from "@/lib/cms/paths";

export const runtime = "nodejs";

const MAX_BYTES = 200 * 1024 * 1024; // 200 MB — large client films

function extFor(type: string, original: string): string {
  const fromName = path.extname(original).toLowerCase();
  if (fromName && fromName.length <= 6) return fromName;
  if (type.includes("png")) return ".png";
  if (type.includes("webp")) return ".webp";
  if (type.includes("avif")) return ".avif";
  if (type.includes("webm")) return ".webm";
  if (type.includes("quicktime")) return ".mov";
  if (type.includes("ogg")) return ".ogg";
  if (type.includes("mpeg")) return ".mpeg";
  if (type.includes("3gpp")) return ".3gp";
  if (type.includes("matroska")) return ".mkv";
  if (type.includes("msvideo") || type.includes("avi")) return ".avi";
  if (type.includes("mp4") || type.includes("m4v")) return ".mp4";
  if (type.startsWith("video/")) return ".mp4";
  return ".jpg";
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
  }
  if (!isAllowedUpload(file)) {
    return NextResponse.json(
      {
        error:
          "Допустимы изображения и видео (mp4, webm, mov, m4v, ogg, mpeg, avi, mkv, 3gp…)",
      },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Файл слишком большой (макс. 200 МБ)" },
      { status: 400 },
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const stamp = Date.now();
  const rand = randomBytes(4).toString("hex");
  const ext = extFor(file.type, file.name);
  const folder =
    file.type.startsWith("video/") ||
    /\.(mp4|webm|mov|m4v|ogg|ogv|mpeg|mpg|3gp|avi|mkv)$/i.test(file.name)
      ? "videos"
      : "images";
  const rel = `${folder}/${stamp}-${rand}${ext}`;

  try {
    if (useBlobStorage()) {
      const url = await uploadToBlob(
        `uploads/${rel}`,
        buf,
        file.type || "application/octet-stream",
      );
      return NextResponse.json({ url, size: file.size, type: file.type });
    }

    if (isVercelRuntime()) {
      return NextResponse.json(
        {
          error:
            "На Vercel добавьте Blob Storage, иначе загрузка невозможна.",
        },
        { status: 503 },
      );
    }

    const abs = path.join(UPLOADS_DIR, rel);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, buf);
    const url = `${UPLOADS_PUBLIC_PREFIX}/${rel.replace(/\\/g, "/")}`;
    return NextResponse.json({ url, size: file.size, type: file.type });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Ошибка загрузки файла";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

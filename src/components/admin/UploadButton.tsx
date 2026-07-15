"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { readApiJson } from "@/lib/cms/readApiJson";

/** Compress large photos in-browser before upload (avoids Vercel limits). */
async function prepareFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.size <= 1.8 * 1024 * 1024) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxEdge = 2200;
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", 0.86),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.\w+$/i, ".jpg");
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

async function uploadViaServer(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const parsed = await readApiJson<{ url?: string; error?: string }>(res);
  if (!parsed.ok || !parsed.data?.url) {
    throw new Error(parsed.message || parsed.data?.error || "Ошибка загрузки");
  }
  return parsed.data.url;
}

async function uploadViaBlobClient(file: File): Promise<string> {
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const pathname = `uploads/${Date.now()}-${safeName}`;
  const blob = await upload(pathname, file, {
    access: "public",
    handleUploadUrl: "/api/admin/blob",
    multipart: file.size > 4 * 1024 * 1024,
  });
  return blob.url;
}

export async function uploadAdminFile(file: File): Promise<string> {
  const prepared = await prepareFile(file);
  // Photos compress under ~4.5MB → server upload via OIDC works on Vercel.
  // Larger files prefer direct Blob client upload (needs BLOB_READ_WRITE_TOKEN).
  const preferServer = prepared.size <= 4 * 1024 * 1024;

  const tryServer = () => uploadViaServer(prepared);
  const tryClient = () => uploadViaBlobClient(prepared);

  if (preferServer) {
    try {
      return await tryServer();
    } catch (serverErr) {
      try {
        return await tryClient();
      } catch (blobErr) {
        const serverMsg =
          serverErr instanceof Error ? serverErr.message : "Ошибка загрузки";
        const blobMsg =
          blobErr instanceof Error ? blobErr.message : "Blob upload failed";
        throw new Error(serverMsg || blobMsg);
      }
    }
  }

  try {
    return await tryClient();
  } catch (blobErr) {
    try {
      return await tryServer();
    } catch (serverErr) {
      const blobMsg =
        blobErr instanceof Error ? blobErr.message : "Blob upload failed";
      const serverMsg =
        serverErr instanceof Error ? serverErr.message : "Server upload failed";
      if (/BLOB_READ_WRITE_TOKEN|не настроен|не подключён|Blob/i.test(blobMsg)) {
        throw new Error(serverMsg);
      }
      throw new Error(serverMsg || blobMsg);
    }
  }
}

export function UploadButton({
  label = "Загрузить",
  accept = "image/jpeg,image/png,image/webp,video/mp4",
  onUploaded,
}: {
  label?: string;
  accept?: string;
  onUploaded: (url: string) => void | Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <label
        className={`inline-flex cursor-pointer items-center justify-center rounded-luxe border border-gold/40 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold/20 ${busy ? "opacity-60" : ""}`}
      >
        {busy ? "Загрузка…" : label}
        <input
          type="file"
          accept={accept}
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setBusy(true);
            setError(null);
            void uploadAdminFile(file)
              .then(onUploaded)
              .catch((err: unknown) => {
                setError(err instanceof Error ? err.message : "Ошибка");
              })
              .finally(() => setBusy(false));
          }}
        />
      </label>
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

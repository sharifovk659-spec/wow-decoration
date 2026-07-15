"use client";

import { useState } from "react";

export async function uploadAdminFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Ошибка загрузки");
  }
  return data.url;
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

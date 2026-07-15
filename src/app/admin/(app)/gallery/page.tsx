"use client";

import { useMemo, useState } from "react";
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";
import { UploadButton } from "@/components/admin/UploadButton";
import { useAdminManifest } from "@/components/admin/useAdminManifest";

export default function AdminGalleryPage() {
  const { manifest, setManifest, save, saving, message, error, loading } =
    useAdminManifest();
  const [category, setCategory] = useState<GalleryCategory>("interiors");

  const items = useMemo(
    () => manifest.gallery ?? galleryItems,
    [manifest.gallery],
  );

  async function persist(nextItems: GalleryItem[]) {
    const next = { ...manifest, gallery: nextItems };
    setManifest(next);
    await save(next);
  }

  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
        Gallery
      </p>
      <h2 className="mt-2 font-display text-3xl text-bone">Галерея</h2>
      <p className="mt-2 text-sm text-bone-dim">
        Добавляйте и удаляйте фото на странице /gallery.
      </p>

      <div className="mt-8 flex flex-wrap items-end gap-4 rounded-luxe-lg border border-line/80 bg-ink-800/40 p-5">
        <label className="text-xs uppercase tracking-[0.16em] text-bone-soft">
          Категория
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as GalleryCategory)}
            className="mt-2 block rounded-luxe border border-line bg-ink px-3 py-2 text-sm text-bone"
          >
            {galleryCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <UploadButton
          label="Добавить фото"
          accept="image/*"
          onUploaded={async (url) => {
            const item: GalleryItem = {
              key: `upload-${Date.now()}`,
              src: url,
              category,
            };
            await persist([...items, item]);
          }}
        />
        {manifest.gallery ? (
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              const next = { ...manifest, gallery: null };
              setManifest(next);
              void save(next);
            }}
            className="text-xs uppercase tracking-[0.16em] text-bone-dim hover:text-gold"
          >
            Вернуть базовый список
          </button>
        ) : null}
      </div>

      {loading ? (
        <p className="mt-8 text-bone-dim">Загрузка…</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.key}
              className="overflow-hidden rounded-luxe-lg border border-line/70 bg-ink-800/40"
            >
              <div className="relative aspect-[3/2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <span className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                  {item.category}
                </span>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    void persist(items.filter((_, i) => i !== index));
                  }}
                  className="text-[0.65rem] uppercase tracking-[0.16em] text-bone-dim hover:text-red-300"
                >
                  Удалить
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {message ? <p className="mt-4 text-sm text-gold">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

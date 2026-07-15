"use client";

import { productionStepImage } from "@/lib/media";
import { UploadButton } from "@/components/admin/UploadButton";
import { useAdminManifest } from "@/components/admin/useAdminManifest";

const LABELS = [
  "01 Работа станков",
  "02 Ручная резьба",
  "03 Шлифовка",
  "04 Сборка",
  "05 Лакировка",
  "06 Упаковка",
  "07 Погрузка",
  "08 Установка",
];

export default function AdminProductionPage() {
  const { manifest, setManifest, save, saving, message, error, loading } =
    useAdminManifest();

  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
        Production
      </p>
      <h2 className="mt-2 font-display text-3xl text-bone">Шаги производства</h2>
      <p className="mt-2 text-sm text-bone-dim">
        Замените фото любого этапа — изменения сразу видны на главной.
      </p>
      {loading ? (
        <p className="mt-8 text-bone-dim">Загрузка…</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {LABELS.map((label, i) => {
            const key = String(i);
            const src =
              manifest.productionSteps[key] || productionStepImage(i);
            return (
              <article
                key={key}
                className="overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-800/50"
              >
                <div className="relative aspect-[5/2]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={label}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center p-5">
                    <p className="font-display text-2xl text-gold">
                      {label.slice(0, 2)}
                    </p>
                    <h3 className="mt-1 text-lg text-bone">{label.slice(3)}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <UploadButton
                    label="Новое фото"
                    accept="image/*"
                    onUploaded={async (url) => {
                      const next = {
                        ...manifest,
                        productionSteps: {
                          ...manifest.productionSteps,
                          [key]: url,
                        },
                      };
                      setManifest(next);
                      await save(next);
                    }}
                  />
                  {manifest.productionSteps[key] ? (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => {
                        const productionSteps = { ...manifest.productionSteps };
                        delete productionSteps[key];
                        const next = { ...manifest, productionSteps };
                        setManifest(next);
                        void save(next);
                      }}
                      className="text-xs uppercase tracking-[0.16em] text-bone-dim hover:text-gold"
                    >
                      Сбросить
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
      {message ? (
        <p className="mt-4 text-sm text-gold">{message}</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

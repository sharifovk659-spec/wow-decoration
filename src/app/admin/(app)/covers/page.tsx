"use client";

import { projects } from "@/lib/projects";
import { UploadButton } from "@/components/admin/UploadButton";
import { useAdminManifest } from "@/components/admin/useAdminManifest";

export default function AdminCoversPage() {
  const { manifest, setManifest, save, saving, message, error, loading } =
    useAdminManifest();

  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
        Covers
      </p>
      <h2 className="mt-2 font-display text-3xl text-bone">
        Обложки проектов
      </h2>
      <p className="mt-2 text-sm text-bone-dim">
        Замена обложек карточек и страниц проектов.
      </p>

      {loading ? (
        <p className="mt-8 text-bone-dim">Загрузка…</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {projects.map((project) => {
            const cover =
              manifest.projectCovers[project.slug] || project.cover;
            return (
              <article
                key={project.slug}
                className="overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-800/50"
              >
                <div className="relative aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover}
                    alt={project.title.ru}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="font-display text-xl text-bone">
                    {project.title.ru}
                  </h3>
                  <p className="text-xs text-bone-dim">{project.slug}</p>
                  <div className="flex flex-wrap gap-3">
                    <UploadButton
                      label="Новая обложка"
                      accept="image/*"
                      onUploaded={async (url) => {
                        const next = {
                          ...manifest,
                          projectCovers: {
                            ...manifest.projectCovers,
                            [project.slug]: url,
                          },
                        };
                        setManifest(next);
                        await save(next);
                      }}
                    />
                    {manifest.projectCovers[project.slug] ? (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => {
                          const projectCovers = { ...manifest.projectCovers };
                          delete projectCovers[project.slug];
                          const next = { ...manifest, projectCovers };
                          setManifest(next);
                          void save(next);
                        }}
                        className="text-xs uppercase tracking-[0.16em] text-bone-dim hover:text-gold"
                      >
                        Сбросить
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {message ? <p className="mt-4 text-sm text-gold">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

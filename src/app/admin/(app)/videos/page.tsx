"use client";

import { useRef, useState } from "react";
import type { CmsVideoTestimonial } from "@/lib/cms/types";
import { IMAGE_ACCEPT, VIDEO_ACCEPT } from "@/lib/cms/mediaTypes";
import { videoTestimonials } from "@/lib/videoTestimonials";
import { siteVideos } from "@/lib/videos";
import {
  UploadButton,
  uploadAdminFile,
} from "@/components/admin/UploadButton";
import { useAdminManifest } from "@/components/admin/useAdminManifest";
import {
  externalLinkDisplay,
  parseExternalVideoInput,
  posterForExternalVideo,
} from "@/lib/cms/externalVideo";

const HERO_POSTER_DEFAULT = "/images/hero/banner-01023.jpg";
const HERO_VIDEO_DEFAULT = "/videos/hero.mp4";

function cloneFilms(
  list: readonly CmsVideoTestimonial[],
): CmsVideoTestimonial[] {
  return list.map((f) => ({
    id: f.id,
    poster: f.poster,
    youtubeId: f.youtubeId,
    instagramId: f.instagramId ?? null,
    instagramKind: f.instagramKind ?? null,
    duration: f.duration,
    src: f.src ?? null,
  }));
}

function patchFilmAt(
  list: readonly CmsVideoTestimonial[],
  index: number,
  patch: Partial<CmsVideoTestimonial>,
): CmsVideoTestimonial[] {
  const next = cloneFilms(list);
  const current = next[index];
  if (!current) return next;
  next[index] = { ...current, ...patch };
  return next;
}

function patchFromExternalLink(
  raw: string,
): Partial<CmsVideoTestimonial> | null {
  const parsed = parseExternalVideoInput(raw);
  if (!parsed) return null;
  if (parsed.provider === "youtube") {
    return {
      youtubeId: parsed.id,
      instagramId: null,
      instagramKind: null,
      poster: posterForExternalVideo(parsed),
    };
  }
  return {
    youtubeId: "",
    instagramId: parsed.id,
    instagramKind: parsed.instagramKind ?? "reel",
    poster: posterForExternalVideo(parsed),
  };
}

export default function AdminVideosPage() {
  const { manifest, setManifest, save, saving, message, error, loading } =
    useAdminManifest();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addMode, setAddMode] = useState<"choose" | "link">("choose");
  const [linkInput, setLinkInput] = useState("");
  const [addBusy, setAddBusy] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const films = manifest.videoTestimonials ?? videoTestimonials;
  const heroPoster = manifest.hero.poster || HERO_POSTER_DEFAULT;
  const heroVideo = manifest.hero.video || HERO_VIDEO_DEFAULT;
  const processMp4 = manifest.processVideo.mp4 || siteVideos.process.mp4;
  const processPoster =
    manifest.processVideo.poster || siteVideos.process.poster;

  async function persistFilms(nextFilms: CmsVideoTestimonial[]) {
    const next = { ...manifest, videoTestimonials: nextFilms };
    setManifest(next);
    await save(next);
  }

  function closeAdd() {
    setAddOpen(false);
    setAddMode("choose");
    setLinkInput("");
    setAddError(null);
    setAddBusy(false);
  }

  function commitFilm(item: CmsVideoTestimonial) {
    const nextFilms = [...cloneFilms(films), item];
    const next = { ...manifest, videoTestimonials: nextFilms };
    setManifest(next);
    void save(next);
    closeAdd();
  }

  async function addFromFile(file: File) {
    setAddBusy(true);
    setAddError(null);
    try {
      const url = await uploadAdminFile(file);
      commitFilm({
        id: `film-${Date.now()}`,
        poster: HERO_POSTER_DEFAULT,
        youtubeId: "",
        duration: "0:00",
        src: url,
      });
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Ошибка загрузки");
      setAddBusy(false);
    }
  }

  function addFromLink() {
    const patch = patchFromExternalLink(linkInput);
    if (!patch) {
      setAddError(
        "Вставьте ссылку YouTube, Instagram (Reel) или ID видео",
      );
      return;
    }
    commitFilm({
      id: `film-${Date.now()}`,
      poster: patch.poster ?? HERO_POSTER_DEFAULT,
      youtubeId: patch.youtubeId ?? "",
      instagramId: patch.instagramId ?? null,
      instagramKind: patch.instagramKind ?? null,
      duration: "0:00",
      src: null,
    });
  }

  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
        Video
      </p>
      <h2 className="mt-2 font-display text-3xl text-bone">Видео и обложки</h2>

      {loading ? (
        <p className="mt-8 text-bone-dim">Загрузка…</p>
      ) : (
        <div className="mt-8 space-y-10">
          <section className="rounded-luxe-lg border border-line/80 bg-ink-800/40 p-5 md:p-6">
            <h3 className="font-display text-2xl text-bone">Hero</h3>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroPoster}
                  alt=""
                  className="aspect-video w-full rounded-luxe object-cover"
                />
                <div className="mt-3">
                  <UploadButton
                    label="Poster hero"
                    accept={IMAGE_ACCEPT}
                    onUploaded={async (url) => {
                      const next = {
                        ...manifest,
                        hero: { ...manifest.hero, poster: url },
                      };
                      setManifest(next);
                      await save(next);
                    }}
                  />
                </div>
              </div>
              <div>
                <video
                  key={heroVideo}
                  src={heroVideo}
                  controls
                  className="aspect-video w-full rounded-luxe bg-ink object-cover"
                />
                <div className="mt-3">
                  <UploadButton
                    label="Video hero"
                    accept={VIDEO_ACCEPT}
                    onUploaded={async (url) => {
                      const next = {
                        ...manifest,
                        hero: { ...manifest.hero, video: url },
                      };
                      setManifest(next);
                      await save(next);
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-luxe-lg border border-line/80 bg-ink-800/40 p-5 md:p-6">
            <h3 className="font-display text-2xl text-bone">
              Фон производства
            </h3>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={processPoster}
                  alt=""
                  className="aspect-video w-full rounded-luxe object-cover"
                />
                <div className="mt-3">
                  <UploadButton
                    label="Poster process"
                    accept={IMAGE_ACCEPT}
                    onUploaded={async (url) => {
                      const next = {
                        ...manifest,
                        processVideo: {
                          ...manifest.processVideo,
                          poster: url,
                        },
                      };
                      setManifest(next);
                      await save(next);
                    }}
                  />
                </div>
              </div>
              <div>
                <video
                  key={processMp4}
                  src={processMp4}
                  controls
                  className="aspect-video w-full rounded-luxe bg-ink object-cover"
                />
                <div className="mt-3">
                  <UploadButton
                    label="Video process"
                    accept={VIDEO_ACCEPT}
                    onUploaded={async (url) => {
                      const next = {
                        ...manifest,
                        processVideo: {
                          ...manifest.processVideo,
                          mp4: url,
                        },
                      };
                      setManifest(next);
                      await save(next);
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-2xl text-bone">Client films</h3>
              <button
                type="button"
                onClick={() => {
                  setAddOpen(true);
                  setAddMode("choose");
                  setAddError(null);
                }}
                className="rounded-luxe border border-gold/40 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold/20"
              >
                Добавить видео
              </button>
            </div>

            {addOpen ? (
              <div className="mt-4 rounded-luxe-lg border border-gold/30 bg-ink-800/70 p-5">
                {addMode === "choose" ? (
                  <>
                    <p className="text-sm text-bone-soft">
                      Откуда добавить видео?
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={addBusy}
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-luxe border border-gold/40 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold/20 disabled:opacity-60"
                      >
                        {addBusy ? "Загрузка…" : "Из файла"}
                      </button>
                      <button
                        type="button"
                        disabled={addBusy}
                        onClick={() => {
                          setAddMode("link");
                          setAddError(null);
                        }}
                        className="rounded-luxe border border-gold/40 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold/20 disabled:opacity-60"
                      >
                        YouTube / Instagram
                      </button>
                      <button
                        type="button"
                        disabled={addBusy}
                        onClick={closeAdd}
                        className="rounded-luxe border border-line px-4 py-2 text-xs uppercase tracking-[0.18em] text-bone-dim transition hover:text-bone"
                      >
                        Отмена
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={VIDEO_ACCEPT}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (file) void addFromFile(file);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p className="text-sm text-bone-soft">
                      Ссылка YouTube, Instagram Reel или ID
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <input
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="YouTube, instagram.com/reel/…"
                        className="min-w-[16rem] flex-1 rounded-luxe border border-line bg-ink px-3 py-2 text-sm text-bone"
                      />
                      <button
                        type="button"
                        onClick={addFromLink}
                        className="rounded-luxe border border-gold/40 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold/20"
                      >
                        Добавить
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAddMode("choose");
                          setAddError(null);
                        }}
                        className="rounded-luxe border border-line px-4 py-2 text-xs uppercase tracking-[0.18em] text-bone-dim"
                      >
                        Назад
                      </button>
                    </div>
                  </>
                )}
                {addError ? (
                  <p className="mt-3 text-sm text-red-300">{addError}</p>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {films.map((film, index) => (
                <article
                  key={film.id}
                  className="overflow-hidden rounded-luxe-lg border border-line/70 bg-ink-800/40"
                >
                  <div className="relative aspect-[9/16] bg-ink">
                    {film.src ? (
                      <video
                        key={film.src}
                        src={film.src}
                        poster={film.poster}
                        controls
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={film.poster}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="space-y-2 p-3">
                    <input
                      defaultValue={externalLinkDisplay(film)}
                      key={`${film.id}-link-${film.youtubeId}-${film.instagramId}`}
                      onBlur={(e) => {
                        const raw = e.target.value.trim();
                        if (!raw) return;
                        const patch = patchFromExternalLink(raw);
                        if (patch) {
                          void persistFilms(patchFilmAt(films, index, patch));
                        }
                      }}
                      className="w-full rounded-luxe border border-line bg-ink px-2 py-1.5 text-xs text-bone"
                      placeholder="YouTube или Instagram ссылка"
                    />
                    <input
                      defaultValue={film.duration}
                      key={`${film.id}-dur-${film.duration}`}
                      onBlur={(e) => {
                        const duration = e.target.value.trim() || "0:00";
                        void persistFilms(
                          patchFilmAt(films, index, { duration }),
                        );
                      }}
                      className="w-full rounded-luxe border border-line bg-ink px-2 py-1.5 text-xs text-bone"
                      placeholder="0:45"
                    />
                    <div className="flex gap-2">
                      <UploadButton
                        className="flex-1"
                        label="Постер"
                        accept={IMAGE_ACCEPT}
                        onUploaded={async (url) => {
                          await persistFilms(
                            patchFilmAt(films, index, { poster: url }),
                          );
                        }}
                      />
                      <UploadButton
                        className="flex-1"
                        label="Файл видео"
                        accept={VIDEO_ACCEPT}
                        onUploaded={async (url) => {
                          await persistFilms(
                            patchFilmAt(films, index, { src: url }),
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1">
                      {film.src ? (
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() => {
                            void persistFilms(
                              patchFilmAt(films, index, { src: null }),
                            );
                          }}
                          className="text-[0.65rem] uppercase tracking-[0.16em] text-bone-dim hover:text-gold"
                        >
                          Убрать файл
                        </button>
                      ) : null}
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => {
                          void persistFilms(
                            cloneFilms(films).filter((_, i) => i !== index),
                          );
                        }}
                        className="text-[0.65rem] uppercase tracking-[0.16em] text-bone-dim hover:text-red-300"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {saving ? (
              <p className="mt-3 text-xs text-bone-dim">Сохранение…</p>
            ) : null}
          </section>
        </div>
      )}
      {message ? <p className="mt-4 text-sm text-gold">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

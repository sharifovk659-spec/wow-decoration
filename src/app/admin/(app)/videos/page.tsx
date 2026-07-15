"use client";

import { videoTestimonials } from "@/lib/videoTestimonials";
import { siteVideos } from "@/lib/videos";
import { UploadButton } from "@/components/admin/UploadButton";
import { useAdminManifest } from "@/components/admin/useAdminManifest";

const HERO_POSTER_DEFAULT = "/images/hero/banner-01023.jpg";
const HERO_VIDEO_DEFAULT = "/videos/hero.mp4";

export default function AdminVideosPage() {
  const { manifest, setManifest, save, saving, message, error, loading } =
    useAdminManifest();

  const films = manifest.videoTestimonials ?? videoTestimonials;
  const heroPoster = manifest.hero.poster || HERO_POSTER_DEFAULT;
  const heroVideo = manifest.hero.video || HERO_VIDEO_DEFAULT;
  const processMp4 = manifest.processVideo.mp4 || siteVideos.process.mp4;
  const processPoster =
    manifest.processVideo.poster || siteVideos.process.poster;

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
                    accept="image/*"
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
                    accept="video/mp4,video/webm"
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
                    accept="image/*"
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
                    accept="video/mp4,video/webm"
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
            <h3 className="font-display text-2xl text-bone">Client films</h3>
            <p className="mt-2 text-sm text-bone-dim">
              Постер и YouTube ID для каждого ролика.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {films.map((film, index) => (
                <article
                  key={film.id}
                  className="overflow-hidden rounded-luxe-lg border border-line/70 bg-ink-800/40"
                >
                  <div className="relative aspect-[9/16]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={film.poster}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 p-3">
                    <input
                      value={film.youtubeId}
                      onChange={(e) => {
                        const videoTestimonials = films.map((f, i) =>
                          i === index
                            ? { ...f, youtubeId: e.target.value.trim() }
                            : f,
                        );
                        setManifest({ ...manifest, videoTestimonials });
                      }}
                      onBlur={() => {
                        void save({
                          ...manifest,
                          videoTestimonials: films,
                        });
                      }}
                      className="w-full rounded-luxe border border-line bg-ink px-2 py-1.5 text-xs text-bone"
                      placeholder="YouTube ID"
                    />
                    <UploadButton
                      label="Постер"
                      accept="image/*"
                      onUploaded={async (url) => {
                        const videoTestimonials = films.map((f, i) =>
                          i === index ? { ...f, poster: url } : f,
                        );
                        const next = { ...manifest, videoTestimonials };
                        setManifest(next);
                        await save(next);
                      }}
                    />
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

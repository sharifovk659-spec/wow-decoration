"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  HiArrowLongLeft,
  HiArrowLongRight,
  HiArrowsPointingOut,
  HiPlay,
} from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";
import { easeLuxe } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const t = useTranslations("projects");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const reduceMotion = useReducedMotion();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);

  const showHeroVideo = Boolean(project.video) && !reduceMotion;
  const galleryVisible = showAllGallery
    ? project.gallery
    : project.gallery.slice(0, 12);

  const metaRows = [
    { label: t("detail.country"), value: project.country[locale] },
    { label: t("detail.year"), value: project.year },
    { label: t("detail.area"), value: project.area[locale] },
    { label: t("detail.duration"), value: project.duration[locale] },
    { label: t("detail.location"), value: project.location[locale] },
    {
      label: t("detail.category"),
      value: t(`filters.${project.category}`),
    },
  ];

  return (
    <article className="bg-ink">
      {/* Hero */}
      <div className="relative h-[72vh] min-h-[32rem] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: easeLuxe }}
          className="absolute inset-0"
        >
          <Image
            src={project.cover}
            alt={project.title[locale]}
            fill
            priority
            sizes="100vw"
            quality={92}
            className="object-cover object-center"
          />
          {showHeroVideo && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              onCanPlay={() => setHeroVideoReady(true)}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
                heroVideoReady ? "opacity-100" : "opacity-0",
              )}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/60" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="container-luxe relative flex h-full flex-col justify-between pb-14 pt-32">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-bone-soft transition-colors hover:text-gold"
          >
            <HiArrowLongLeft className="transition-transform group-hover:-translate-x-1" />
            {t("detail.back")}
          </Link>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-gold-soft"
            >
              <span>{project.country[locale]}</span>
              <span className="text-bone-faint">·</span>
              <span>{t(`filters.${project.category}`)}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: easeLuxe }}
              className="text-h1 max-w-5xl font-display text-bone"
            >
              {project.title[locale]}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Meta + overview */}
      <section className="container-luxe grid gap-14 py-20 lg:grid-cols-12 lg:gap-20 md:py-28">
        <div className="lg:col-span-4">
          <dl className="flex flex-col divide-y divide-line border-y border-line">
            {metaRows.map((row) => (
              <div key={row.label} className="flex justify-between gap-6 py-4">
                <dt className="text-xs uppercase tracking-[0.14em] text-bone-dim">
                  {row.label}
                </dt>
                <dd className="text-end text-sm text-bone">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <p className="eyebrow mb-4">{t("detail.materials")}</p>
            <ul className="flex flex-wrap gap-2">
              {project.materials[locale].map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-xs text-bone-soft"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow mb-6">{t("detail.overview")}</p>
            <p className="text-lead leading-relaxed text-bone-soft">
              {project.overview[locale]}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <p className="eyebrow mb-6">{t("detail.completedWorks")}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.completedWorks[locale].map((s, i) => (
                <li
                  key={s}
                  className="flex items-start gap-4 rounded-luxe border border-line/80 bg-ink-800/60 p-5"
                >
                  <span className="font-display text-lg text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-bone-soft">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Process video */}
      {project.processVideo && (
        <section className="border-y border-line bg-ink-800 py-20 md:py-28">
          <div className="container-luxe">
            <Reveal className="mb-10 max-w-2xl">
              <p className="eyebrow mb-4">{t("detail.processVideo")}</p>
              <h2 className="text-h2 text-bone">{t("detail.processVideoTitle")}</h2>
            </Reveal>
            <div className="relative aspect-video overflow-hidden rounded-luxe-lg shadow-image ring-1 ring-inset ring-gold/15">
              <video
                controls
                playsInline
                preload="metadata"
                poster={project.cover}
                className="h-full w-full object-cover"
              >
                <source src={project.processVideo} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/20 opacity-0 transition-opacity hover:opacity-0">
                <HiPlay className="text-5xl text-gold" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Production + installation */}
      <section className="container-luxe grid gap-14 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <p className="eyebrow mb-6">{t("detail.productionProcess")}</p>
          <ol className="space-y-4">
            {project.productionSteps[locale].map((step, i) => (
              <li
                key={step}
                className="flex gap-4 border-b border-line pb-4 last:border-0"
              >
                <span className="font-display text-2xl text-gold/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-sm text-bone-soft">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-6">{t("detail.installationProcess")}</p>
          <ol className="space-y-4">
            {project.installationSteps[locale].map((step, i) => (
              <li
                key={step}
                className="flex gap-4 border-b border-line pb-4 last:border-0"
              >
                <span className="font-display text-2xl text-gold/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-sm text-bone-soft">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Gallery 40+ */}
      <section className="border-t border-line bg-ink-800 py-20 md:py-28">
        <div className="container-luxe">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">{t("detail.gallery")}</p>
              <h2 className="text-h2 text-bone">
                {project.gallery.length}+ {t("detail.photos")}
              </h2>
            </div>
            <span className="text-xs uppercase tracking-[0.15em] text-bone-faint">
              {t("detail.viewFull")}
            </span>
          </div>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {galleryVisible.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setLightboxIndex(i)}
                data-cursor="hover"
                aria-label={t("detail.viewFull")}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-luxe-lg shadow-image"
              >
                <Image
                  src={src}
                  alt={`${project.title[locale]} — ${i + 1}`}
                  width={1920}
                  height={1280}
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="h-auto w-full object-cover object-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/20">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/40 bg-ink/50 text-bone opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <HiArrowsPointingOut />
                  </span>
                </span>
              </button>
            ))}
          </div>

          {!showAllGallery && project.gallery.length > 12 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllGallery(true)}
                className="rounded-full border border-gold/35 px-8 py-3 text-xs uppercase tracking-[0.16em] text-gold transition-colors hover:border-gold hover:bg-gold/5"
              >
                {t("detail.showAllPhotos")} ({project.gallery.length})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Final result */}
      <section className="container-luxe py-20 md:py-28">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-6">{t("detail.result")}</p>
          <h2 className="text-h2 text-bone">{t("detail.resultTitle")}</h2>
          <p className="text-lead mt-8 leading-relaxed text-bone-dim">
            {project.result[locale]}
          </p>
        </Reveal>
      </section>

      {/* Next project */}
      <section className="border-t border-line">
        <Link
          href={`/projects/${next.slug}`}
          className="group block"
          data-cursor="hover"
        >
          <div className="container-luxe flex flex-col items-center py-20 text-center md:py-28">
            <span className="eyebrow mb-4">{t("detail.next")}</span>
            <h2 className="text-h2 text-bone transition-colors duration-500 group-hover:text-gold">
              {next.title[locale]}
            </h2>
            <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-bone-dim transition-colors group-hover:text-gold">
              {t("viewProject")}
              <HiArrowLongRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </section>

      <section className="container-luxe flex flex-col items-center gap-6 border-t border-line py-20 text-center">
        <ButtonLink href="/contact" variant="primary" withArrow>
          {t("detail.cta")}
        </ButtonLink>
      </section>

      <Lightbox
        images={project.gallery}
        index={lightboxIndex ?? 0}
        open={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        alt={(i) => `${project.title[locale]} — ${i + 1}`}
        labels={{
          close: tc("close"),
          previous: tc("previous"),
          next: tc("next"),
          fullscreen: tc("fullscreen"),
        }}
      />
    </article>
  );
}

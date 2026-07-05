"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  HiArrowLongLeft,
  HiArrowLongRight,
  HiArrowsPointingOut,
} from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
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

  const showHeroVideo = Boolean(project.video) && !reduceMotion;

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[68vh] min-h-[30rem] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: easeLuxe }}
          className="absolute inset-0"
        >
          <Image
            src={project.cover}
            alt={project.title[locale]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/50" />

        <div className="container-luxe relative flex h-full flex-col justify-between pb-14 pt-32">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-bone-soft transition-colors hover:text-gold"
          >
            <HiArrowLongLeft className="transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
            {t("detail.back")}
          </Link>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold-soft"
            >
              <span>{t(`filters.${project.category}`)}</span>
              <span className="text-bone-faint">·</span>
              <span>{project.year}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: easeLuxe }}
              className="text-h1 max-w-4xl text-bone"
            >
              {project.title[locale]}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Meta + overview */}
      <section className="container-luxe grid gap-12 py-20 lg:grid-cols-12 lg:gap-20 md:py-28">
        <div className="lg:col-span-4">
          <dl className="flex flex-col divide-y divide-line border-y border-line">
            {[
              { label: t("detail.location"), value: project.location[locale] },
              { label: t("detail.year"), value: project.year },
              {
                label: t("detail.category"),
                value: t(`filters.${project.category}`),
              },
            ].map((row) => (
              <div key={row.label} className="flex justify-between gap-6 py-4">
                <dt className="text-xs uppercase tracking-[0.15em] text-bone-dim">
                  {row.label}
                </dt>
                <dd className="text-sm text-bone">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <p className="eyebrow mb-4">{t("detail.materials")}</p>
            <ul className="flex flex-wrap gap-2">
              {project.materials[locale].map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-line px-4 py-1.5 text-xs text-bone-soft"
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
            <p className="text-h3 font-display leading-snug text-bone-soft">
              {project.overview[locale]}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <p className="eyebrow mb-6">{t("detail.scope")}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.scope[locale].map((s, i) => (
                <li key={s} className="card-luxe flex items-center gap-4 p-5">
                  <span className="font-display text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-bone-soft">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-luxe pb-24 md:pb-32">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <p className="eyebrow">{t("detail.gallery")}</p>
          <span className="text-xs uppercase tracking-[0.15em] text-bone-faint">
            {t("detail.viewFull")}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {project.gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              data-cursor="hover"
              aria-label={t("detail.viewFull")}
              className={cn(
                "group relative block overflow-hidden rounded-luxe-lg shadow-image",
                i === 0 && "md:col-span-2",
              )}
            >
              <ParallaxImage
                src={src}
                alt={`${project.title[locale]} — ${i + 1}`}
                className={i === 0 ? "aspect-[16/10] w-full" : "aspect-[4/5] w-full"}
                imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25">
                <span className="flex h-14 w-14 translate-y-2 items-center justify-center rounded-full border border-bone/40 bg-ink/40 text-bone opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <HiArrowsPointingOut className="text-lg" />
                </span>
              </span>
            </button>
          ))}
        </div>
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
              {t("detail.cta")}
              <HiArrowLongRight className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </span>
          </div>
        </Link>
      </section>

      <section className="container-luxe flex flex-col items-center gap-6 py-20 text-center">
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

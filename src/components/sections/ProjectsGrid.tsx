"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLongRight, HiPlay } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { easeLuxe, fadeUp, lineReveal, staggerContainer } from "@/lib/motion";
import { HoverVideo } from "@/components/ui/HoverVideo";
import { ButtonLink } from "@/components/ui/Button";

type Filter = ProjectCategory | "all";

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<Filter>("all");

  const filters: Filter[] = ["all", ...projectCategories];

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  const hero = visible[0];
  const rest = visible.slice(1);

  return (
    <section className="container-luxe pb-[30px]">
      {/* Filter bar */}
      <div className="mb-luxe flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-line pb-6 mb-luxe">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            data-cursor="hover"
            className={cn(
              "relative text-sm uppercase tracking-[0.15em] transition-colors duration-300 rtl:tracking-[0.05em]",
              filter === f ? "text-gold" : "text-bone-dim hover:text-bone",
            )}
          >
            {t(`filters.${f}`)}
            {filter === f && (
              <motion.span
                layoutId="filter-underline"
                className="absolute -bottom-[1.6rem] left-0 h-px w-full bg-gold"
                transition={{ duration: 0.4, ease: easeLuxe }}
              />
            )}
          </button>
        ))}
        <span className="ms-auto font-display text-lg text-bone-faint">
          {String(visible.length).padStart(2, "0")}
        </span>
      </div>

      {/* Featured hero */}
      <AnimatePresence mode="wait">
        {hero && (
          <motion.div
            key={hero.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeLuxe }}
          >
            <Link
              href={`/projects/${hero.slug}`}
              data-cursor="hover"
              className="group relative block overflow-hidden rounded-luxe-lg shadow-image transition-shadow duration-700 hover:shadow-luxe-lg"
            >
              <HoverVideo
                src={hero.cover}
                video={hero.video}
                alt={hero.title[locale]}
                sizes="(max-width: 1024px) 100vw, 92vw"
                priority
                inLink
                className="aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[21/9]"
                imageClassName="transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />

              <div className="pointer-events-none absolute inset-0 rounded-luxe-lg bg-gradient-to-t from-ink via-ink/35 to-transparent" />

              {hero.video && (
                <span className="absolute end-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-bone/30 bg-ink/30 text-bone backdrop-blur-sm transition-all duration-500 group-hover:border-gold group-hover:text-gold">
                  <HiPlay className="text-lg ltr:translate-x-px" />
                </span>
              )}

              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.08)}
                className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14"
              >
                <motion.div
                  variants={fadeUp}
                  className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold-soft"
                >
                  <span>{t(`filters.${hero.category}`)}</span>
                  <span className="text-bone-faint">·</span>
                  <span>{hero.year}</span>
                </motion.div>

                <div className="overflow-hidden pb-2">
                  <motion.h2
                    variants={lineReveal}
                    className="text-h1 max-w-3xl text-bone"
                  >
                    {hero.title[locale]}
                  </motion.h2>
                </div>

                <motion.div
                  variants={fadeUp}
                  className="mt-5 flex items-center gap-4"
                >
                  <span className="text-sm text-bone-soft">
                    {hero.location[locale]}
                  </span>
                  <span className="hidden h-px w-16 bg-gold/40 sm:block" />
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-bone transition-colors duration-300 group-hover:text-gold">
                    {t("viewProject")}
                    <HiArrowLongRight className="transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-16"
      >
        <AnimatePresence mode="popLayout">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              offset={i % 2 === 1}
              t={t}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 flex justify-center border-t border-line pt-12">
        <ButtonLink href="/contact" variant="primary" withArrow>
          {t("detail.cta")}
        </ButtonLink>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  locale,
  offset,
  t,
}: {
  project: Project;
  locale: Locale;
  offset: boolean;
  t: (key: string) => string;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: easeLuxe }}
      className={cn(offset && "md:mt-16")}
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="hover"
        className="group block"
      >
        <div className="relative overflow-hidden rounded-luxe-lg shadow-image transition-shadow duration-700 group-hover:shadow-luxe-lg">
          <HoverVideo
            src={project.cover}
            video={project.video}
            alt={project.title[locale]}
            sizes="(max-width: 768px) 100vw, 46vw"
            inLink
            className="aspect-[4/3] w-full"
            imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <span className="rounded-full border border-bone/25 bg-ink/30 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-bone backdrop-blur-sm rtl:tracking-[0.1em]">
              {t(`filters.${project.category}`)}
            </span>
            {project.video && (
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 bg-ink/30 text-bone backdrop-blur-sm transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                <HiPlay className="text-sm ltr:translate-x-px" />
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-gold-soft">
              <span>{project.year}</span>
            </div>
            <h3 className="text-h3 text-bone transition-colors duration-300 group-hover:text-gold">
              {project.title[locale]}
            </h3>
            <p className="mt-1 text-sm text-bone-dim">
              {project.location[locale]}
            </p>
          </div>
          <HiArrowLongRight className="mt-2 shrink-0 text-2xl text-bone-dim transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </div>
      </Link>
    </motion.article>
  );
}

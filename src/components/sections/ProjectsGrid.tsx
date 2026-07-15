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
import { easeLuxe, fadeUp } from "@/lib/motion";
import { HoverVideo } from "@/components/ui/HoverVideo";
import { ButtonLink } from "@/components/ui/Button";
import { useCmsMedia } from "@/hooks/useCmsMedia";

type Filter = ProjectCategory | "all";

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const cms = useCmsMedia();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: Filter[] = ["all", ...projectCategories];

  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter);
    return list.map((p) => ({
      ...p,
      cover: cms?.projectCovers?.[p.slug] || p.cover,
    }));
  }, [filter, cms]);

  return (
    <section className="container-luxe pb-[30px]">
      <div className="mb-luxe flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-line pb-6">
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

      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
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
  t,
}: {
  project: Project;
  locale: Locale;
  t: (key: string) => string;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: easeLuxe }}
      className="flex h-full flex-col"
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="hover"
        className="group flex h-full flex-col"
      >
        <div className="relative overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-900 shadow-image transition-shadow duration-500 group-hover:shadow-luxe-lg">
          <HoverVideo
            src={project.cover}
            video={project.video}
            alt={project.title[locale]}
            sizes="(max-width: 768px) 100vw, 33vw"
            inLink
            className="aspect-[3/2] w-full"
            imageClassName="bg-ink-900 object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5">
            <span className="rounded-full border border-bone/25 bg-ink/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-bone backdrop-blur-sm rtl:tracking-[0.1em]">
              {t(`filters.${project.category}`)}
            </span>
            {project.video && (
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 bg-ink/30 text-bone backdrop-blur-sm transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                <HiPlay className="text-sm ltr:translate-x-px" />
              </span>
            )}
          </div>
        </div>

          <div className="mt-5 flex flex-1 items-start justify-between gap-4 px-0.5">
          <div className="min-w-0">
            <h3 className="text-h3 text-bone transition-colors duration-300 group-hover:text-gold">
              {project.title[locale]}
            </h3>
            <p className="mt-1 text-[0.9375rem] text-bone-dim md:text-base">
              {project.location[locale]}
            </p>
          </div>
          <HiArrowLongRight className="mt-2 shrink-0 text-2xl text-bone-dim transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </div>
      </Link>
    </motion.article>
  );
}

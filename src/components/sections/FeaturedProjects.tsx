"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import {
  projects,
  projectCategories,
  type ProjectCategory,
} from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { easeLuxe, fadeUp, staggerContainer } from "@/lib/motion";

type Filter = ProjectCategory | "all";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<Filter>("all");

  const filters: Filter[] = ["all", ...projectCategories];

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects.filter((p) => p.featured)
        : projects.filter((p) => p.featured && p.category === filter),
    [filter],
  );

  return (
    <section
      id="projects"
      className="relative scroll-mt-28 overflow-hidden border-t border-line py-28 md:scroll-mt-32 md:py-48"
    >
      <div className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-12 md:mb-14"
        />

        <div className="mb-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-line pb-6 md:mb-16">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-cursor="hover"
              className={cn(
                "relative text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300 md:text-xs md:tracking-[0.15em]",
                filter === f ? "text-gold" : "text-bone-dim hover:text-bone",
              )}
            >
              {t(`filters.${f}`)}
              {filter === f && (
                <motion.span
                  layoutId="home-project-filter"
                  className="absolute -bottom-[1.55rem] left-0 h-px w-full bg-gold"
                  transition={{ duration: 0.4, ease: easeLuxe }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3"
          >
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                variants={fadeUp}
                className={cn(i === 0 && visible.length > 2 && "md:col-span-2 xl:col-span-2")}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor="hover"
                  className="group relative block overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-800 shadow-luxe transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-gold/35 hover:shadow-image"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      i === 0 && visible.length > 2
                        ? "aspect-[16/10] md:aspect-[21/9]"
                        : "aspect-[4/5]",
                    )}
                  >
                    <Image
                      src={project.cover}
                      alt={project.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
                    <div className="absolute inset-0 bg-gold/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  </div>

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 md:p-6">
                    <span className="rounded-full border border-gold/30 bg-ink/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
                      {t(`filters.${project.category}`)}
                    </span>
                    <span className="font-display text-lg text-bone/80">
                      {project.year}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <h3
                      className={cn(
                        "font-display text-bone",
                        i === 0 && visible.length > 2
                          ? "text-3xl md:text-4xl"
                          : "text-2xl md:text-3xl",
                      )}
                    >
                      {project.title[locale]}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-xl text-sm text-bone-dim">
                      {project.summary[locale]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-gold opacity-80 transition-all duration-500 group-hover:gap-3 group-hover:opacity-100">
                      {t("viewProject")}
                      <HiArrowLongRight className="text-sm transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex justify-center md:mt-16">
          <ButtonLink href="/projects" variant="outline" withArrow>
            {t("cta")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

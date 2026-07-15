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
import { useCmsMedia } from "@/hooks/useCmsMedia";

type Filter = ProjectCategory | "all";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const cms = useCmsMedia();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: Filter[] = ["all", ...projectCategories];

  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? projects.filter((p) => p.featured)
        : projects.filter((p) => p.featured && p.category === filter);
    return list.map((p) => ({
      ...p,
      cover: cms?.projectCovers?.[p.slug] || p.cover,
    }));
  }, [filter, cms]);

  return (
    <section
      id="projects"
      className="relative scroll-mt-28 overflow-hidden border-t border-line py-20 md:scroll-mt-32 md:py-32"
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
            className="grid gap-6 sm:grid-cols-2 lg:gap-8"
          >
            {visible.map((project) => (
              <motion.div key={project.slug} variants={fadeUp}>
                <Link
                  href="/contact"
                  data-cursor="hover"
                  className="group relative block overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-800 shadow-luxe transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-image"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-ink-900">
                    <Image
                      src={project.cover}
                      alt={project.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={95}
                      className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                    {/* Readable text scrim — stronger on mobile */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25 max-md:via-ink/65 max-md:to-ink/35"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/90 to-transparent md:h-1/2"
                      aria-hidden
                    />
                  </div>

                  <div className="absolute inset-x-0 top-0 flex items-center p-5 md:p-6">
                    <span className="rounded-full border border-gold/30 bg-ink/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
                      {t(`filters.${project.category}`)}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="font-display text-2xl text-bone drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] md:text-3xl">
                      {project.title[locale]}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-xl text-[0.9375rem] leading-relaxed text-bone-soft drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] md:text-base">
                      {project.summary[locale]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-gold drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:gap-3 group-hover:opacity-100">
                      {t("detail.cta")}
                      <HiArrowLongRight className="text-sm transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-16">
          <ButtonLink href="/projects" variant="outline" withArrow>
            {t("cta")}
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary" withArrow>
            {t("detail.cta")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

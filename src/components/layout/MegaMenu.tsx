"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLocale, useTranslations } from "next-intl";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects, projectCategories } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { photoUrl } from "@/lib/media";

export type MegaKey = "services" | "projects";

const SERVICE_KEYS = ["0", "1", "2", "3", "4", "5"] as const;

const MEGA_IMG = photoUrl("1615529182904-14819c35db37");

interface MegaMenuProps {
  active: MegaKey | null;
  onNavigate: () => void;
}

/**
 * Full-width mega-menu panel with a GSAP reveal (clip + stagger). Rendered
 * inside the header so hovering into the panel keeps it open. Both panels
 * stay mounted; the last-opened one persists during the exit animation.
 */
export function MegaMenu({ active, onNavigate }: MegaMenuProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const featured = getFeaturedProjects().slice(0, 2);

  const panelRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);

  // Keep the last-opened panel visible during the exit animation.
  // (React's documented "adjust state while rendering" pattern.)
  const [displayKey, setDisplayKey] = useState<MegaKey>(active ?? "services");
  const [prevActive, setPrevActive] = useState<MegaKey | null>(active);
  if (active !== prevActive) {
    setPrevActive(active);
    if (active) setDisplayKey(active);
  }

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(panel);

    if (active) {
      const wasOpen = openRef.current;
      openRef.current = true;
      gsap.set(panel, { display: "block", pointerEvents: "auto" });

      if (reduce) {
        gsap.set(panel, { opacity: 1, y: 0, clipPath: "none" });
        return;
      }

      const items = panel.querySelectorAll<HTMLElement>(
        `[data-mega="${active}"] .mega-anim`,
      );
      const tl = gsap.timeline();
      if (!wasOpen) {
        tl.fromTo(
          panel,
          { opacity: 0, y: -14, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.6,
            ease: "power3.out",
          },
        );
      }
      tl.fromTo(
        items,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.045, ease: "power3.out" },
        wasOpen ? 0 : "-=0.3",
      );
    } else {
      if (!openRef.current) return;
      openRef.current = false;
      if (reduce) {
        gsap.set(panel, { display: "none" });
        return;
      }
      gsap.to(panel, {
        opacity: 0,
        y: -8,
        duration: 0.32,
        ease: "power2.in",
        onComplete: () =>
          gsap.set(panel, { display: "none", pointerEvents: "none" }),
      });
    }
  }, [active]);

  return (
    <div
      ref={panelRef}
      className="absolute inset-x-0 top-full hidden"
      style={{ display: "none" }}
    >
      <div className="glass border-x-0 border-t-0 shadow-luxe-lg">
        <div className="container-luxe py-12">
          {/* Disciplines */}
          <div
            data-mega="services"
            className={displayKey === "services" ? "grid grid-cols-12 gap-10" : "hidden"}
          >
            <div className="col-span-4 flex flex-col">
              <span className="eyebrow mega-anim mb-4">
                {t("services.eyebrow")}
              </span>
              <h3 className="mega-anim text-h3 mb-4 text-bone">
                {t("nav.services")}
              </h3>
              <p className="mega-anim mb-8 max-w-xs text-sm text-bone-dim">
                {t("services.description")}
              </p>
              <Link
                href="/services"
                onClick={onNavigate}
                data-cursor="hover"
                className="mega-anim group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-gold transition-colors"
              >
                {t("nav.services")}
                <HiArrowLongRight className="transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <div className="mega-anim relative mt-8 hidden aspect-[16/10] overflow-hidden rounded-luxe-lg xl:block">
                <Image
                  src={MEGA_IMG}
                  alt=""
                  fill
                  sizes="360px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/30" />
              </div>
            </div>

            <ul className="col-span-8 grid grid-cols-2 gap-x-10 gap-y-2 self-start">
              {SERVICE_KEYS.map((key) => (
                <li key={key} className="mega-anim">
                  <Link
                    href="/services"
                    onClick={onNavigate}
                    data-cursor="hover"
                    className="group flex gap-5 border-b border-line py-5 transition-colors"
                  >
                    <span className="font-display text-sm text-gold/70">
                      {t(`services.items.${key}.index`)}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-xl text-bone transition-colors duration-300 group-hover:text-gold">
                        {t(`services.items.${key}.title`)}
                      </span>
                      <span className="text-sm text-bone-dim">
                        {t(`services.items.${key}.text`)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commissions */}
          <div
            data-mega="projects"
            className={displayKey === "projects" ? "grid grid-cols-12 gap-10" : "hidden"}
          >
            <div className="col-span-4 flex flex-col">
              <span className="eyebrow mega-anim mb-4">
                {t("projects.eyebrow")}
              </span>
              <h3 className="mega-anim text-h3 mb-4 text-bone">
                {t("nav.projects")}
              </h3>
              <p className="mega-anim mb-8 max-w-xs text-sm text-bone-dim">
                {t("projects.description")}
              </p>
              <Link
                href="/projects"
                onClick={onNavigate}
                data-cursor="hover"
                className="mega-anim group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-gold transition-colors"
              >
                {t("projects.cta")}
                <HiArrowLongRight className="transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>

            <ul className="col-span-3 flex flex-col self-start">
              {projectCategories.map((cat) => (
                <li key={cat} className="mega-anim">
                  <Link
                    href="/projects"
                    onClick={onNavigate}
                    data-cursor="hover"
                    className="group flex items-center justify-between border-b border-line py-4 text-bone transition-colors hover:text-gold"
                  >
                    <span className="font-display text-xl">
                      {t(`projects.filters.${cat}`)}
                    </span>
                    <HiArrowLongRight className="text-bone-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="col-span-5 grid grid-cols-2 gap-5">
              {featured.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  onClick={onNavigate}
                  data-cursor="hover"
                  className="mega-anim group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-luxe-lg">
                    <Image
                      src={project.cover}
                      alt={project.title[locale]}
                      fill
                      sizes="220px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-display text-lg leading-tight text-bone">
                        {project.title[locale]}
                      </p>
                      <p className="mt-1 text-xs text-gold-soft">
                        {project.location[locale]}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

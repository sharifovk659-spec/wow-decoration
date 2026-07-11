"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  countries,
  countryKeys,
  type CountryKey,
} from "@/lib/countries";
import { getProjectsByCountry } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import type { CountryPath } from "@/lib/worldGeo";
import { cn } from "@/lib/utils";
import { easeLuxe, fadeUp } from "@/lib/motion";

const VIEWBOX = "0 48 1000 360";

const project = (lng: number, lat: number) => ({
  x: ((lng + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});

const ACTIVE_ISO = new Set(
  countryKeys.map((key) => countries[key].iso),
);

export function WorldMap() {
  const t = useTranslations("worldMap");
  const tProjects = useTranslations("projects");
  const locale = useLocale() as Locale;
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<CountryPath[] | null>(null);
  const [selected, setSelected] = useState<CountryKey>("uae");

  const filtered = useMemo(
    () => getProjectsByCountry(selected),
    [selected],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !done) {
          done = true;
          import("@/lib/worldGeo").then((m) => setGeo(m.worldCountries));
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!geo || !svgRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".wm-country", {
        opacity: 0,
        duration: 0.45,
        stagger: { each: 0.006, from: "random" },
        scrollTrigger: { trigger: svgRef.current, start: "top 85%" },
      });
    }, svgRef);
    return () => ctx.revert();
  }, [geo]);

  return (
    <section
      id="countries"
      className="relative scroll-mt-28 overflow-hidden border-t border-line bg-ink py-28 md:scroll-mt-32 md:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute start-1/2 top-1/3 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]"
      />
      <div ref={rootRef} className="container-luxe relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
          className="mx-auto mb-12 max-w-3xl md:mb-16"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {countryKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              data-cursor="hover"
              className={cn(
                "shrink-0 rounded-full border px-4 py-2.5 text-xs leading-snug transition-all duration-300 md:px-5 md:py-2.5 md:text-sm",
                selected === key
                  ? "border-gold/50 bg-gold/10 text-gold shadow-gold"
                  : "border-line text-bone-dim hover:border-gold/30 hover:text-bone",
              )}
            >
              {t(`countries.${key}`)}
            </button>
          ))}
        </div>

        <div className="relative mb-14 overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={VIEWBOX}
            className="h-auto w-full"
            role="img"
            aria-label={t("title")}
          >
            <defs>
              <filter id="wm-glow" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>

            {geo?.map((c, i) => {
              const active = ACTIVE_ISO.has(c.id);
              const selectedIso = countries[selected].iso;
              const isSelected = c.id === selectedIso;
              return (
                <path
                  key={i}
                  className="wm-country"
                  d={c.d}
                  fill={isSelected ? "rgba(192,160,104,0.12)" : "none"}
                  stroke={
                    isSelected
                      ? "rgba(192,160,104,0.85)"
                      : active
                        ? "rgba(192,160,104,0.45)"
                        : "rgba(236,229,214,0.1)"
                  }
                  strokeWidth={isSelected ? 1 : 0.5}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {countryKeys.map((key) => {
              const c = countries[key];
              const p = project(c.lng, c.lat);
              const isActive = selected === key;
              return (
                <g
                  key={key}
                  className="cursor-pointer"
                  onClick={() => setSelected(key)}
                >
                  <title>{t(`countries.${key}`)}</title>
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    fill="none"
                    stroke="#c0a068"
                    strokeWidth={0.6}
                    vectorEffect="non-scaling-stroke"
                    initial={{ r: 3, opacity: 0.5 }}
                    animate={{ r: 12, opacity: 0 }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 5 : 3.5}
                    fill={isActive ? "#f0d9a4" : "#c0a068"}
                    filter="url(#wm-glow)"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: easeLuxe }}
          >
            <p className="eyebrow mb-6 text-center">
              {t("projectsIn")} {t(`countries.${selected}`)}
            </p>

            {filtered.length === 0 ? (
              <p className="text-center text-bone-dim">{t("noProjects")}</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex gap-4 rounded-luxe-lg border border-line/80 bg-ink-800/70 p-4 transition-all hover:border-gold/35 hover:shadow-gold"
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={p.cover}
                          alt={p.title[locale]}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg text-bone group-hover:text-gold-soft">
                          {p.title[locale]}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-bone-dim">
                          {p.summary[locale]}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.14em] text-gold">
                          {tProjects("viewProject")}
                          <HiArrowLongRight className="text-sm" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

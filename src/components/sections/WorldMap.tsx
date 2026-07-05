"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CountryPath } from "@/lib/worldGeo";

// Cropped equirectangular window (trims empty Arctic + Antarctica).
const VIEWBOX = "0 48 1000 360";

const project = (lng: number, lat: number) => ({
  x: ((lng + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});

interface Loc {
  key: string;
  lng: number;
  lat: number;
  atelier?: boolean;
  hub?: boolean;
}

const LOCATIONS: Loc[] = [
  { key: "dubai", lng: 55.27, lat: 25.2, atelier: true, hub: true },
  { key: "milan", lng: 9.19, lat: 45.46, atelier: true },
  { key: "istanbul", lng: 28.98, lat: 41.01, atelier: true },
  { key: "london", lng: -0.13, lat: 51.51 },
  { key: "paris", lng: 2.35, lat: 48.86 },
  { key: "geneva", lng: 6.14, lat: 46.2 },
  { key: "moscow", lng: 37.62, lat: 55.75 },
  { key: "riyadh", lng: 46.72, lat: 24.63 },
  { key: "doha", lng: 51.53, lat: 25.29 },
  { key: "casablanca", lng: -7.59, lat: 33.57 },
  { key: "singapore", lng: 103.82, lat: 1.35 },
];

// Countries with realised commissions — outlined in gold.
const HIGHLIGHT = new Set([784, 380, 792, 826, 250, 756, 682, 634, 504, 643]);

const HUB = project(55.27, 25.2);

function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(dist * 0.28, 70);
  return `M${a.x} ${a.y} Q${mx} ${my - lift} ${b.x} ${b.y}`;
}

export function WorldMap() {
  const t = useTranslations("worldMap");
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [countries, setCountries] = useState<CountryPath[] | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Lazy-load the ~76KB geometry only as the map nears the viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done) {
            done = true;
            import("@/lib/worldGeo").then((m) => setCountries(m.worldCountries));
            io.disconnect();
          }
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sparkle-reveal the countries once the geometry is present.
  useEffect(() => {
    if (!countries || reduce || !svgRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".wm-country", {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: { each: 0.008, from: "random" },
        scrollTrigger: { trigger: svgRef.current, start: "top 82%" },
      });
    }, svgRef);
    return () => ctx.revert();
  }, [countries, reduce]);

  const countryLayer = useMemo(
    () =>
      countries?.map((c, i) => {
        const gold = HIGHLIGHT.has(c.id);
        return (
          <path
            key={i}
            className="wm-country"
            d={c.d}
            fill="none"
            stroke={gold ? "rgba(184,150,90,0.6)" : "rgba(236,229,214,0.13)"}
            strokeWidth={gold ? 0.7 : 0.5}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        );
      }),
    [countries],
  );

  return (
    <section className="relative overflow-hidden border-t border-line bg-ink py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute start-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-gold/5 blur-[120px]"
      />
      <div ref={rootRef} className="container-luxe relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
          className="mx-auto mb-14 max-w-2xl md:mb-20"
        />

        <div className="relative">
          <svg
            ref={svgRef}
            viewBox={VIEWBOX}
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label={t("title")}
          >
            <defs>
              <linearGradient id="wm-arc" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#b8965a" stopOpacity="0" />
                <stop offset="50%" stopColor="#d8b878" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#b8965a" stopOpacity="0" />
              </linearGradient>
              <filter id="wm-glow" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>

            {countryLayer}

            {/* Connection arcs from the hub */}
            {!reduce &&
              LOCATIONS.filter((l) => !l.hub).map((l, i) => {
                const p = project(l.lng, l.lat);
                return (
                  <motion.path
                    key={`arc-${l.key}`}
                    d={arcPath(HUB, p)}
                    fill="none"
                    stroke="url(#wm-arc)"
                    strokeWidth={0.7}
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 1.6,
                      delay: 0.4 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                );
              })}

            {/* Markers */}
            {LOCATIONS.map((l, i) => {
              const p = project(l.lng, l.lat);
              const active = hovered === l.key;
              const showLabel = l.atelier || active;
              const r = l.atelier ? 3 : 2.2;
              return (
                <g
                  key={l.key}
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(l.key)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <title>
                    {t(`locations.${l.key}.city`)} — {t(`locations.${l.key}.country`)}
                  </title>

                  {!reduce && (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      fill="none"
                      stroke="#b8965a"
                      strokeWidth={0.6}
                      vectorEffect="non-scaling-stroke"
                      initial={{ r, opacity: 0.55 }}
                      animate={{ r: r + 7, opacity: 0 }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 0.22,
                      }}
                    />
                  )}

                  {/* Halo */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r + 1.5}
                    fill="#d8b878"
                    opacity={active ? 0.7 : 0.4}
                    filter="url(#wm-glow)"
                  />
                  {/* Core dot */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={active ? r + 1 : r}
                    fill={l.atelier ? "#f0d9a4" : "#d8b878"}
                    className="transition-all duration-300"
                  />
                  {l.atelier && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r + 2.5}
                      fill="none"
                      stroke="#b8965a"
                      strokeWidth={0.5}
                      opacity={0.5}
                      vectorEffect="non-scaling-stroke"
                    />
                  )}

                  {showLabel && (
                    <text
                      x={p.x + r + 4}
                      y={p.y - 2}
                      fill={active ? "#e7d9bf" : "#b8965a"}
                      fontSize={9}
                      className="pointer-events-none select-none font-medium uppercase tracking-[0.14em]"
                    >
                      {t(`locations.${l.key}.city`)}
                    </text>
                  )}
                  {active && (
                    <text
                      x={p.x + r + 4}
                      y={p.y + 8}
                      fill="rgba(236,229,214,0.6)"
                      fontSize={7.5}
                      className="pointer-events-none select-none uppercase tracking-[0.12em]"
                    >
                      {t(`locations.${l.key}.country`)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.18em] text-bone-dim">
          <span className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f0d9a4] shadow-[0_0_8px_2px_rgba(216,184,120,0.6)]" />
            {t("atelierLabel")}
          </span>
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#d8b878]" />
            {t("presenceLabel")}
          </span>
        </div>
      </div>
    </section>
  );
}

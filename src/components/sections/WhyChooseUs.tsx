"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  HiOutlineBuildingOffice2,
  HiOutlineGlobeAlt,
  HiOutlineMapPin,
  HiOutlineCog6Tooth,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlinePaintBrush,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { useGSAP } from "@/hooks/useGSAP";
import { Counter } from "@/components/ui/Counter";

const ICONS: IconType[] = [
  HiOutlineBuildingOffice2,
  HiOutlineGlobeAlt,
  HiOutlineMapPin,
  HiOutlineCog6Tooth,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlinePaintBrush,
  HiOutlineShieldCheck,
];

const reasonKeys = ["0", "1", "2", "3", "4", "5", "6", "7"] as const;

const STATS = [
  { value: 100, suffix: "+" },
  { value: 10, suffix: "+" },
  { value: 20, suffix: "+" },
] as const;

export function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        gsap.set(".why-head, .why-card, .why-stat", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from(".why-head", {
        autoAlpha: 0,
        y: 26,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".why-card", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".why-grid", start: "top 82%" },
      });
      gsap.from(".why-stat", {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".why-stats", start: "top 88%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="why-us"
      className="relative scroll-mt-28 overflow-hidden border-t border-line py-28 md:scroll-mt-32 md:py-48"
    >
      <div ref={root} className="container-luxe">
        <div className="mx-auto max-w-3xl text-center">
          <div className="why-head mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold/70" />
            <span className="eyebrow">{t("eyebrow")}</span>
            <span className="h-px w-12 bg-gold/70" />
          </div>
          <h2 className="why-head text-h2 text-bone">{t("title")}</h2>
          <p className="why-head text-lead mt-6 text-bone-dim">
            {t("description")}
          </p>
        </div>

        <div className="why-grid mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 md:mt-20">
          {reasonKeys.map((key, i) => {
            const Icon = ICONS[i]!;
            return (
              <article
                key={key}
                className="why-card group flex flex-col rounded-luxe-lg border border-line/80 bg-ink-800/60 p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-gold md:p-7"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold transition-colors group-hover:border-gold/50 group-hover:bg-gold/10">
                  <Icon className="text-xl" />
                </span>
                <h3 className="text-lg font-medium leading-snug text-bone">
                  {t(`reasons.${key}.title`)}
                </h3>
                {t(`reasons.${key}.text`) && (
                  <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                    {t(`reasons.${key}.text`)}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <div className="why-stats mt-20 grid grid-cols-1 gap-y-12 border-t border-line pt-14 sm:grid-cols-3 md:mt-28 md:pt-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className="why-stat relative flex flex-col items-center px-4 text-center"
            >
              {i > 0 && (
                <span className="absolute inset-y-1 start-0 hidden w-px bg-line-strong sm:block" />
              )}
              <span className="font-display text-5xl text-brass md:text-6xl lg:text-7xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-4 text-xs uppercase tracking-[0.18em] text-bone-dim">
                {t(`stats.${i}.label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

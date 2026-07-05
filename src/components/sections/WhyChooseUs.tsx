"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  HiOutlineSparkles,
  HiOutlinePencilSquare,
  HiOutlineSwatch,
  HiOutlineCube,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { useGSAP } from "@/hooks/useGSAP";
import { Counter } from "@/components/ui/Counter";

const ICONS: IconType[] = [
  HiOutlineSparkles,
  HiOutlinePencilSquare,
  HiOutlineSwatch,
  HiOutlineCube,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
];

const reasonKeys = ["0", "1", "2", "3", "4", "5"] as const;

const STATS = [
  { value: 25, suffix: "+" },
  { value: 98, suffix: "%" },
  { value: 100, suffix: "%" },
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
      if (reduce) return;

      gsap.from(".why-eyebrow-line", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
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
        stagger: 0.1,
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
      gsap.fromTo(
        ".why-stat-rule",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".why-stats", start: "top 88%" },
        },
      );
    },
    { scope: root },
  );

  return (
    <section className="relative overflow-hidden border-t border-line py-28 md:py-48">
      <div ref={root} className="container-luxe">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="why-head mb-7 flex items-center justify-center gap-4">
            <span className="why-eyebrow-line h-px w-12 bg-gold/70" />
            <span className="eyebrow">{t("eyebrow")}</span>
            <span className="why-eyebrow-line h-px w-12 bg-gold/70" />
          </div>
          <h2 className="why-head text-h2 text-bone">{t("title")}</h2>
          <p className="why-head text-lead mt-6 text-bone-dim">
            {t("description")}
          </p>
        </div>

        {/* Reason cards */}
        <div className="why-grid mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:mt-20">
          {reasonKeys.map((key, i) => {
            const Icon = ICONS[i]!;
            return (
              <article
                key={key}
                className="why-card card-luxe group flex flex-col p-8 md:p-10"
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/10">
                    <Icon className="text-2xl" />
                  </span>
                  <span className="font-display text-lg text-bone-faint transition-colors duration-500 group-hover:text-gold-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-h3 text-bone">
                  {t(`reasons.${key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                  {t(`reasons.${key}.text`)}
                </p>
                <span className="mt-7 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold/60 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rtl:origin-right" />
              </article>
            );
          })}
        </div>

        {/* Animated counters */}
        <div className="why-stats mt-20 grid grid-cols-1 gap-y-12 border-t border-line pt-14 sm:grid-cols-3 md:mt-28 md:pt-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className="why-stat relative flex flex-col items-center px-4 text-center sm:px-8"
            >
              {i > 0 && (
                <span className="why-stat-rule absolute inset-y-1 start-0 hidden w-px bg-line-strong sm:block" />
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

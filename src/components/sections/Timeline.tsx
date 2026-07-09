"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineLightBulb,
  HiOutlineCubeTransparent,
  HiOutlineWrenchScrewdriver,
  HiOutlineCheckBadge,
  HiOutlineTruck,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { useGSAP } from "@/hooks/useGSAP";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: IconType[] = [
  HiOutlineChatBubbleLeftRight,
  HiOutlineLightBulb,
  HiOutlineCubeTransparent,
  HiOutlineWrenchScrewdriver,
  HiOutlineCheckBadge,
  HiOutlineTruck,
  HiOutlineHomeModern,
];

const stepKeys = ["0", "1", "2", "3", "4", "5", "6"] as const;

export function Timeline() {
  const t = useTranslations("timeline");
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      // Desktop — horizontal progress line
      gsap.fromTo(
        ".tl-line-h",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".tl-desktop",
            start: "top 68%",
            end: "bottom 72%",
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        ".tl-desktop .tl-dot",
        { backgroundColor: "#1e1813", borderColor: "rgba(236,229,214,0.22)" },
        {
          backgroundColor: "#b8965a",
          borderColor: "#b8965a",
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ".tl-desktop",
            start: "top 68%",
            end: "bottom 72%",
            scrub: 0.6,
          },
        },
      );
      gsap.from(".tl-desktop .tl-item", {
        autoAlpha: 0,
        y: 34,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".tl-desktop", start: "top 74%" },
      });

      // Mobile — vertical progress line
      gsap.fromTo(
        ".tl-line-v",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".tl-mobile",
            start: "top 70%",
            end: "bottom 82%",
            scrub: 0.6,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>(".tl-mobile .tl-item-m").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 32,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".tl-mobile .tl-dot-m").forEach((dot) => {
        gsap.fromTo(
          dot,
          { backgroundColor: "#1e1813", borderColor: "rgba(236,229,214,0.22)" },
          {
            backgroundColor: "#b8965a",
            borderColor: "#b8965a",
            duration: 0.3,
            scrollTrigger: { trigger: dot, start: "top 80%" },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-800 section">
      <div ref={root} className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-luxe"
        />

        {/* Desktop — horizontal timeline */}
        <div className="tl-desktop relative hidden lg:block">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line">
            <div className="tl-line-h h-full w-full origin-left bg-gold rtl:origin-right" />
          </div>

          <div className="relative grid grid-cols-7">
            {stepKeys.map((key, i) => {
              const Icon = ICONS[i]!;
              const onTop = i % 2 === 0;
              const content = (
                <div className="tl-item flex flex-col items-center px-3 text-center">
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                    <Icon className="text-xl" />
                  </span>
                  <span className="font-display text-sm text-gold/50">
                    {t(`steps.${key}.number`)}
                  </span>
                  <h3 className="mt-1 font-display text-lg text-bone">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-bone-dim">
                    {t(`steps.${key}.text`)}
                  </p>
                </div>
              );
              return (
                <div key={key} className="flex flex-col items-center">
                  <div className="flex h-52 w-full items-end justify-center">
                    {onTop && content}
                  </div>
                  <span className="tl-dot relative z-10 my-5 h-4 w-4 rounded-full border-2 border-line bg-ink-600" />
                  <div className="flex h-52 w-full items-start justify-center">
                    {!onTop && content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet — vertical timeline */}
        <div className="tl-mobile relative lg:hidden">
          <div className="absolute bottom-0 start-[7px] top-2 w-px bg-line">
            <div className="tl-line-v h-full w-full origin-top bg-gold" />
          </div>

          <div className="flex flex-col gap-6">
            {stepKeys.map((key, i) => {
              const Icon = ICONS[i]!;
              return (
                <div key={key} className="tl-item-m relative ps-12">
                  <span className="tl-dot-m absolute start-0 top-3 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-line bg-ink-600 rtl:translate-x-1/2" />
                  <article className="card-luxe flex flex-col p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                        <Icon className="text-xl" />
                      </span>
                      <span className="font-display text-3xl text-gold/25">
                        {t(`steps.${key}.number`)}
                      </span>
                    </div>
                    <h3 className="text-h3 text-bone">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                      {t(`steps.${key}.text`)}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

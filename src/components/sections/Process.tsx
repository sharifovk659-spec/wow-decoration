"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const steps = ["0", "1", "2", "3", "4", "5", "6"] as const;

export function Process() {
  const t = useTranslations("process");
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        gsap.set(".process-step", { opacity: 1, x: 0 });
        gsap.set(".process-line", { scaleY: 1 });
        return;
      }
      if (!track.current) return;

      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          x: -28,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".process-dot").forEach((dot) => {
        ScrollTrigger.create({
          trigger: dot,
          start: "top 68%",
          onEnter: () => {
            gsap.to(dot, {
              backgroundColor: "#c0a068",
              borderColor: "#c0a068",
              boxShadow: "0 0 0 4px rgba(192,160,104,0.15)",
              duration: 0.35,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(dot, {
              backgroundColor: "#1e1813",
              borderColor: "rgba(192,160,104,0.35)",
              boxShadow: "0 0 0 0px rgba(192,160,104,0)",
              duration: 0.35,
            });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="process"
      className="relative scroll-mt-28 border-t border-line bg-ink-800 py-28 md:scroll-mt-32 md:py-48"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div ref={root} className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-16 md:mb-24"
        />

        <div ref={track} className="relative max-w-3xl">
          <div className="absolute bottom-2 start-[11px] top-2 w-px bg-line">
            <div className="process-line h-full w-full origin-top bg-gradient-to-b from-gold via-gold-soft to-gold/30" />
          </div>

          <ol className="flex flex-col gap-0">
            {steps.map((key, i) => (
              <li
                key={key}
                className={cn(
                  "process-step relative ps-12 md:ps-14",
                  i < steps.length - 1 && "pb-12 md:pb-16",
                )}
              >
                <span className="process-dot absolute top-1.5 start-0 z-10 h-[22px] w-[22px] -translate-x-1/2 rounded-full border-2 border-gold/35 bg-ink-600" />

                <div className="rounded-luxe border border-line/80 bg-ink/40 p-6 transition-[border-color,box-shadow] duration-500 hover:border-gold/25 hover:shadow-gold md:p-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-3xl leading-none text-gold md:text-4xl">
                      {t(`steps.${key}.number`)}
                    </span>
                    <h3 className="text-h3 text-bone">
                      {t(`steps.${key}.title`)}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone-dim md:text-base">
                    {t(`steps.${key}.text`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

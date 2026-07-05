"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = ["0", "1", "2", "3", "4"] as const;

export function Process() {
  const t = useTranslations("process");
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced || !track.current) return;

      // Scroll-drawn progress line
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        },
      );

      // Per-step reveal
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 82%" },
        });
      });

      // Dot activation
      gsap.utils.toArray<HTMLElement>(".process-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { backgroundColor: "#1e1813", borderColor: "rgba(236,229,214,0.22)" },
          {
            backgroundColor: "#b8965a",
            borderColor: "#b8965a",
            duration: 0.3,
            scrollTrigger: { trigger: dot, start: "top 60%" },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section className="relative border-t border-line bg-ink-800 py-28 md:py-48">
      <div ref={root} className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-16 md:mb-24"
        />

        <div ref={track} className="relative">
          {/* Timeline track */}
          <div className="absolute bottom-0 start-[7px] top-2 w-px bg-line md:start-1/2">
            <div className="process-line h-full w-full origin-top bg-gold" />
          </div>

          <div className="flex flex-col gap-16 md:gap-0">
            {steps.map((key, i) => {
              const alignEnd = i % 2 === 1;
              return (
                <div
                  key={key}
                  className="process-step relative ps-10 md:grid md:grid-cols-2 md:gap-16 md:ps-0"
                >
                  {/* Dot */}
                  <span className="process-dot absolute top-1 start-0 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-line bg-ink-600 rtl:translate-x-1/2 md:start-1/2 md:top-2" />

                  <div
                    className={
                      alignEnd
                        ? "md:col-start-2 md:ps-16"
                        : "md:col-start-1 md:pe-16 md:text-end"
                    }
                  >
                    <div className="pb-12 md:pb-24">
                      <span className="font-display text-6xl text-gold/25 md:text-7xl">
                        {t(`steps.${key}.number`)}
                      </span>
                      <h3 className="mt-4 text-h3 text-bone">
                        {t(`steps.${key}.title`)}
                      </h3>
                      <p className="mt-3 max-w-md text-bone-dim md:inline-block">
                        {t(`steps.${key}.text`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

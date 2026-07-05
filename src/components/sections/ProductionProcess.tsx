"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

/** Poster / base frame + reduced-motion fallback. */
const POSTER =
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=2000&q=80";

/**
 * Remote fallback clip (wood carving, Mixkit). Overridden by a local
 * `/videos/process.*` file when present — see public/videos/README.md.
 */
const REMOTE_VIDEO = "https://assets.mixkit.co/videos/20390/20390-720.mp4";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const steps = ["0", "1", "2", "3", "4", "5"] as const;

export function ProductionProcess() {
  const t = useTranslations("production");
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      // Heading
      gsap.from(".prod-head", {
        autoAlpha: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".prod-head-wrap", start: "top 82%" },
      });

      // Background drift
      gsap.to(".prod-bg", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Timeline progress line
      if (track.current) {
        gsap.fromTo(
          ".prod-line",
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
      }

      // Per-step reveal (+ number pop)
      gsap.utils.toArray<HTMLElement>(".prod-step").forEach((step) => {
        const num = step.querySelector(".prod-num");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: step, start: "top 82%" },
        });
        tl.from(step, {
          autoAlpha: 0,
          y: 48,
          duration: 1,
          ease: "power3.out",
        });
        if (num) {
          tl.from(
            num,
            {
              scale: 0.7,
              transformOrigin: "left bottom",
              duration: 0.9,
              ease: "power3.out",
            },
            0.1,
          );
        }
      });

      // Dot activation
      gsap.utils.toArray<HTMLElement>(".prod-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          {
            backgroundColor: "#1e2025",
            borderColor: "rgba(241,234,217,0.22)",
            scale: 1,
          },
          {
            backgroundColor: "#c0a068",
            borderColor: "#c0a068",
            scale: 1.2,
            duration: 0.3,
            scrollTrigger: { trigger: dot, start: "top 58%" },
          },
        );
      });
    },
    { scope: root },
  );

  // Video playback (reduced-motion aware)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      return;
    }
    const play = video.play();
    if (play) play.catch(() => undefined);
  }, []);

  return (
    <section className="relative isolate overflow-hidden py-28 md:py-48">
      {/* Background video */}
      <div className="prod-bg absolute inset-x-0 -top-[6%] -z-10 h-[112%]">
        <Image
          src={POSTER}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out",
            videoReady ? "opacity-100" : "opacity-0",
          )}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          aria-hidden
        >
          <source src="/videos/process.webm" type="video/webm" />
          <source src="/videos/process.mp4" type="video/mp4" />
          <source src={REMOTE_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-ink/85" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(120%_120%_at_50%_40%,transparent_45%,rgba(18,19,22,0.85)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <div ref={root} className="container-luxe">
        <div className="prod-head-wrap mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <p className="prod-head eyebrow mb-5">{t("eyebrow")}</p>
          <h2 className="prod-head text-h2 text-bone">{t("title")}</h2>
          <p className="prod-head text-lead mx-auto mt-6 max-w-xl text-bone-soft">
            {t("description")}
          </p>
        </div>

        <div ref={track} className="relative">
          {/* Timeline track */}
          <div className="absolute bottom-0 start-[7px] top-2 w-px bg-line md:start-1/2">
            <div className="prod-line h-full w-full origin-top bg-gold" />
          </div>

          <div className="flex flex-col gap-16 md:gap-0">
            {steps.map((key, i) => {
              const alignEnd = i % 2 === 1;
              return (
                <div
                  key={key}
                  className="prod-step relative ps-10 md:grid md:grid-cols-2 md:gap-16 md:ps-0"
                >
                  <span className="prod-dot absolute start-0 top-1 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-line bg-ink-600 rtl:translate-x-1/2 md:start-1/2 md:top-2" />

                  <div
                    className={
                      alignEnd
                        ? "md:col-start-2 md:ps-16"
                        : "md:col-start-1 md:pe-16 md:text-end"
                    }
                  >
                    <div className="pb-12 md:pb-24">
                      <span className="prod-num inline-block font-display text-6xl text-gold/25 md:text-7xl">
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

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useGSAP } from "@/hooks/useGSAP";
import { useBackgroundVideo } from "@/hooks/useBackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCmsMedia } from "@/hooks/useCmsMedia";

/** Local still — banner frame for poster / mobile load. Video unchanged. */
const HERO_POSTER_DEFAULT = "/images/hero/banner-01023.jpg";
const HERO_VIDEO_DEFAULT = "/videos/hero.mp4";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Hero() {
  const t = useTranslations("hero");
  const cms = useCmsMedia();
  const HERO_POSTER = cms?.hero?.poster || HERO_POSTER_DEFAULT;
  const HERO_VIDEO = cms?.hero?.video || HERO_VIDEO_DEFAULT;

  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoReady, setVideoReady] = useState(false);

  useBackgroundVideo(videoRef);

  const lines = [t("titleLine1"), t("titleLine2")];
  const stats = [
    { v: t("stat1Value"), l: t("stat1Label") },
    { v: t("stat2Value"), l: t("stat2Label") },
    { v: t("stat3Value"), l: t("stat3Label") },
    { v: t("stat4Value"), l: t("stat4Label") },
  ];

  /* -------- Intro reveal timeline + scroll parallax (GSAP) -------- */
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(contentRef.current, { autoAlpha: 1 });
        return;
      }

      const isMobileIntro = window.matchMedia("(max-width: 767px)").matches;
      gsap.set(mediaInnerRef.current, {
        scale: isMobileIntro ? 1.04 : 1.12,
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.set(contentRef.current, { autoAlpha: 1 })
        .to(
          mediaInnerRef.current,
          { scale: 1, duration: isMobileIntro ? 1.4 : 2, ease: "power3.out" },
          0,
        )
        .from(
          ".hero-eyebrow-line",
          { scaleX: 0, transformOrigin: "left center", duration: 1.1 },
          0.25,
        )
        .from(".hero-eyebrow", { autoAlpha: 0, x: -12, duration: 0.9 }, "<")
        .from(
          ".hero-line-inner",
          { yPercent: 120, duration: 1.3, stagger: 0.12 },
          0.4,
        )
        .from(".hero-desc", { autoAlpha: 0, y: 28, duration: 1 }, "-=0.75")
        .from(".hero-cta", { autoAlpha: 0, y: 28, duration: 1 }, "-=0.85")
        .from(
          ".hero-stat",
          { autoAlpha: 0, y: 22, duration: 0.9, stagger: 0.1 },
          "-=0.8",
        )
        .from(".hero-hint", { autoAlpha: 0, duration: 1 }, "-=0.5");

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (!isMobile) {
        gsap.to(mediaRef.current, {
          yPercent: 16,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(contentRef.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  /* ---------------- Mouse-move parallax (pointer: fine) ----------------- */
  useEffect(() => {
    const section = sectionRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!section || reduce || !fine) return;

    const xTo = gsap.quickTo(mediaInnerRef.current, "x", {
      duration: 1,
      ease: "power3",
    });
    const yTo = gsap.quickTo(mediaInnerRef.current, "y", {
      duration: 1,
      ease: "power3",
    });
    const txTo = gsap.quickTo(titleRef.current, "x", {
      duration: 1.2,
      ease: "power3",
    });
    const tyTo = gsap.quickTo(titleRef.current, "y", {
      duration: 1.2,
      ease: "power3",
    });

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      xTo(nx * -34);
      yTo(ny * -24);
      txTo(nx * 16);
      tyTo(ny * 10);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      txTo(0);
      tyTo(0);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh min-h-[100svh] w-full flex-col overflow-hidden pt-[4.5rem] md:pt-28"
    >
      {/* Full-bleed media — edge to edge on phone & desktop */}
      <div
        ref={mediaRef}
        className="will-transform pointer-events-none absolute inset-0 h-full w-full md:-top-[6%] md:h-[112%]"
      >
        <div ref={mediaInnerRef} className="will-transform relative h-full w-full">
          <Image
            src={HERO_POSTER}
            alt=""
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[center_42%] md:object-center"
          />
          <video
            ref={videoRef}
            src={HERO_VIDEO}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-[center_42%] transition-opacity duration-[1200ms] ease-out md:object-center",
              videoReady ? "opacity-100" : "opacity-0",
            )}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
            aria-hidden
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20 max-md:via-ink/50 max-md:to-ink/15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent max-md:from-ink/70 max-md:via-ink/20 rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(125%_120%_at_50%_28%,transparent_38%,rgba(18,19,22,0.72)_100%)] max-md:[background:radial-gradient(140%_100%_at_50%_35%,transparent_45%,rgba(18,19,22,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/70 to-transparent md:h-44 md:from-ink/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay md:opacity-[0.06]"
        style={{ backgroundImage: NOISE }}
      />

      <div
        ref={contentRef}
        className="container-luxe invisible relative z-10 flex min-h-0 flex-1 flex-col justify-end pb-6 pt-2 sm:pb-10 md:pb-20 md:pt-6"
      >
        <div className="mb-4 flex items-center gap-3 md:mb-8 md:gap-4">
          <span className="hero-eyebrow-line h-px w-10 shrink-0 bg-gold/70 md:w-14" />
          <span className="hero-eyebrow eyebrow max-md:text-[0.65rem] max-md:tracking-[0.12em]">
            {t("eyebrow")}
          </span>
        </div>

        <h1
          ref={titleRef}
          className="will-transform max-w-[18ch] text-balance font-display text-[clamp(1.65rem,5.8vw+0.4rem,4.75rem)] leading-[1.15] text-bone sm:max-w-[24ch] md:leading-[1.08] lg:max-w-[28ch]"
        >
          {lines.map((line, i) => (
            <span key={line} className="clip-text-line block pb-[0.1em]">
              <span
                className={cn(
                  "hero-line-inner block pb-[0.04em]",
                  i === 1 && "text-brass",
                )}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-5 flex flex-col gap-5 sm:mt-8 sm:gap-8 md:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <p className="hero-desc line-clamp-3 max-w-3xl text-[0.875rem] leading-relaxed text-bone-soft sm:line-clamp-none sm:text-base md:text-lg lg:max-w-4xl">
            <span className="font-medium text-gold-soft">
              World of Wood Decoration
            </span>
            {" — "}
            {t("descriptionLead")}
          </p>

          <div className="hero-cta flex w-full shrink-0 flex-nowrap items-center gap-2 sm:w-auto sm:gap-3 md:gap-4">
            <ButtonLink
              href="/contact"
              variant="primary"
              withArrow
              magnetic={false}
              className="min-w-0 flex-1 justify-center whitespace-nowrap px-3 py-2.5 text-[0.68rem] tracking-[0.08em] sm:flex-none sm:px-5 sm:py-3 sm:text-xs md:text-[0.7rem]"
            >
              {t("cta")}
            </ButtonLink>
            <ButtonLink
              href="/projects"
              variant="outline"
              magnetic={false}
              className="min-w-0 flex-1 justify-center whitespace-nowrap px-3 py-2.5 text-[0.68rem] tracking-[0.08em] sm:flex-none sm:px-5 sm:py-3 sm:text-xs md:text-[0.7rem]"
            >
              {t("secondary")}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-6 grid max-w-4xl grid-cols-2 gap-x-3 gap-y-5 border-t border-line pt-5 sm:mt-10 sm:gap-y-8 sm:pt-8 md:mt-16 md:grid-cols-4 md:gap-x-6 md:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={stat.l}
              className="hero-stat relative min-w-0 px-1 text-center md:px-3 md:text-start"
            >
              {i > 0 && (
                <span
                  className={`absolute inset-y-0 start-0 w-px bg-line-strong/80 ${i === 2 ? "max-md:hidden" : ""}`}
                  aria-hidden
                />
              )}
              <p className="font-display text-[1.35rem] leading-none text-[#c8a46a] sm:text-3xl md:text-4xl">
                {stat.v}
              </p>
              <p className="mt-1.5 text-[0.62rem] uppercase leading-snug tracking-[0.06em] text-[#f2e9d8]/80 sm:mt-2 sm:text-xs sm:tracking-[0.15em]">
                {stat.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-hint pointer-events-none absolute bottom-8 end-6 z-10 hidden flex-col items-center gap-3 md:flex">
        <span className="rotate-180 text-[0.65rem] uppercase tracking-[0.3em] text-bone-dim [writing-mode:vertical-lr]">
          {t("scroll")}
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-0 bg-gold [animation:scroll-hint_2s_ease-in-out_infinite]" />
        </span>
      </div>
    </section>
  );
}

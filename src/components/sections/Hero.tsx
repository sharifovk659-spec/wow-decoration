"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useGSAP } from "@/hooks/useGSAP";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Still frame — luxury palace interior, instant LCP + reduced-motion fallback. */
const POSTER =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=80";

/**
 * Remote fallback clip (wooden interior, Mixkit free licence). Used only when
 * a local `/videos/hero.*` file is not present — see public/videos/README.md.
 */
const REMOTE_VIDEO = "https://assets.mixkit.co/videos/3090/3090-720.mp4";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Hero() {
  const t = useTranslations("hero");

  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoReady, setVideoReady] = useState(false);

  const lines = [t("titleLine1"), t("titleLine2")];
  const stats = [
    { v: t("stat1Value"), l: t("stat1Label") },
    { v: t("stat2Value"), l: t("stat2Label") },
    { v: t("stat3Value"), l: t("stat3Label") },
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

      gsap.set(mediaInnerRef.current, { scale: 1.18 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.set(contentRef.current, { autoAlpha: 1 })
        .to(
          mediaInnerRef.current,
          { scale: 1, duration: 2, ease: "power3.out" },
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

      // Scroll parallax — media drifts down, content drifts up (depth).
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

  /* ------------------- Video: play / reduced-motion -------------------- */
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
    <section
      ref={sectionRef}
      className="relative flex min-h-[42rem] min-h-svh w-full flex-col overflow-hidden pt-24 md:pt-28"
    >
      {/* -------- Media layer (parallax) -------- */}
      <div
        ref={mediaRef}
        className="will-transform pointer-events-none absolute -top-[8%] left-0 h-[116%] w-full"
      >
        <div ref={mediaInnerRef} className="will-transform relative h-full w-full">
          <Image
            src={POSTER}
            alt=""
            fill
            priority
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
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            aria-hidden
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src={REMOTE_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* -------- Luxury overlays -------- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/35 to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(125%_120%_at_50%_28%,transparent_32%,rgba(18,19,22,0.78)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      {/* -------- Content -------- */}
      <div
        ref={contentRef}
        className="container-luxe invisible relative z-10 flex min-h-0 flex-1 flex-col justify-end pb-12 pt-4 md:pb-20 md:pt-6"
      >
        <div className="mb-8 flex items-center gap-4">
          <span className="hero-eyebrow-line h-px w-14 bg-gold/70" />
          <span className="hero-eyebrow eyebrow">{t("eyebrow")}</span>
        </div>

        <h1
          ref={titleRef}
          className="will-transform text-display max-w-[14ch] text-balance font-display text-bone"
        >
          {lines.map((line, i) => (
            <span key={line} className="clip-text block">
              <span
                className={cn(
                  "hero-line-inner block",
                  i === 1 && "text-brass",
                )}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-desc text-lead max-w-2xl leading-relaxed text-bone-soft">
            <span className="font-medium text-gold-soft">
              World of Wood Decoration
            </span>
            {" — "}
            {t("descriptionLead")}
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact" variant="primary" withArrow>
              {t("cta")}
            </ButtonLink>
            <ButtonLink href="/projects" variant="outline" magnetic={false}>
              {t("secondary")}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-line pt-8">
          {stats.map((stat) => (
            <div key={stat.l} className="hero-stat">
              <p className="font-display text-3xl text-gold md:text-4xl">
                {stat.v}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-bone-dim">
                {stat.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* -------- Scroll hint -------- */}
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

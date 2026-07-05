"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useGSAP } from "@/hooks/useGSAP";
import { Counter } from "@/components/ui/Counter";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

/** Large workshop / atelier image — the visual anchor of the section. */
const ABOUT_IMG =
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=80";

const stats = [
  { value: 30, suffix: "+" },
  { value: 42, suffix: "" },
  { value: 180, suffix: "+" },
  { value: 120, suffix: "" },
] as const;

export function About() {
  const t = useTranslations();
  const root = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const titleWords = t("about.story.title").split(" ");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      // Eyebrow rule + label
      gsap.from(".about-eyebrow-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".about-eyebrow", {
        autoAlpha: 0,
        x: -10,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      // Masked, word-by-word heading reveal
      gsap.from(".about-word", {
        yPercent: 120,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".about-heading", start: "top 82%" },
      });

      // Copy + CTA fade-up
      gsap.from(".about-fade", {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".about-copy", start: "top 82%" },
      });

      // Image clip-reveal + settle
      gsap.fromTo(
        ".about-image-inner",
        { clipPath: "inset(0% 0% 100% 0% round 8px)", scale: 1.12 },
        {
          clipPath: "inset(0% 0% 0% 0% round 8px)",
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 82%" },
        },
      );
      // Image parallax
      gsap.to(".about-image-media", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      // Founded badge
      gsap.from(".about-badge", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: imageRef.current, start: "top 62%" },
      });

      // KPI strip
      gsap.fromTo(
        ".about-stat-rule",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about-stats", start: "top 88%" },
        },
      );
      gsap.from(".about-stat", {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".about-stats", start: "top 88%" },
      });
    },
    { scope: root },
  );

  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-800 py-28 md:py-48">
      <div ref={root} className="container-luxe">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Narrative */}
          <div className="about-copy lg:col-span-5">
            <div className="mb-7 flex items-center gap-4">
              <span className="about-eyebrow-line h-px w-12 bg-gold/70" />
              <span className="about-eyebrow eyebrow">
                {t("about.sectionEyebrow")}
              </span>
            </div>

            <h2 className="about-heading text-h2 max-w-xl text-bone">
              {titleWords.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="me-[0.26em] inline-block overflow-hidden pb-[0.15em] align-bottom -mb-[0.15em]"
                >
                  <span className="about-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <div className="mt-8 flex flex-col gap-6 text-lead text-bone-dim">
              <p className="about-fade">{t("about.story.paragraph1")}</p>
              <p className="about-fade">{t("about.story.paragraph2")}</p>
            </div>

            <div className="about-fade mt-10">
              <ButtonLink href="/about" variant="outline" withArrow>
                {t("about.sectionCta")}
              </ButtonLink>
            </div>
          </div>

          {/* Large workshop image */}
          <div className="lg:col-span-7">
            <div
              ref={imageRef}
              className="relative mx-auto max-w-2xl lg:ms-auto lg:me-0"
            >
              <div className="about-image-inner relative aspect-[4/5] overflow-hidden rounded-luxe-lg shadow-image sm:aspect-[5/4] lg:aspect-[4/5]">
                <div className="about-image-media absolute -inset-y-[8%] inset-x-0">
                  <Image
                    src={ABOUT_IMG}
                    alt="Craftsmen at work inside the atelier workshop"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-luxe-lg ring-1 ring-inset ring-cream/10" />
              </div>

              {/* Founded badge */}
              <div className="about-badge glass absolute -bottom-6 start-6 flex items-baseline gap-3 rounded-luxe px-6 py-4 shadow-luxe-lg sm:start-8 lg:-start-6">
                <span className="font-display text-4xl leading-none text-gold md:text-5xl">
                  {siteConfig.founded}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-bone-dim">
                  {t("about.since")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated KPI strip — corporate presentation */}
        <div className="about-stats mt-28 grid grid-cols-2 gap-y-14 border-t border-line pt-14 md:mt-36 md:grid-cols-4 md:pt-16">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className="about-stat relative flex flex-col px-2 text-center md:px-8 md:text-start"
            >
              {i > 0 && (
                <span className="about-stat-rule absolute inset-y-1 start-0 hidden w-px bg-line-strong md:block" />
              )}
              <span className="font-display text-5xl text-brass md:text-6xl lg:text-7xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-4 text-xs uppercase tracking-[0.18em] text-bone-dim">
                {t(`stats.items.${i}.label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useGSAP } from "@/hooks/useGSAP";
import { useBackgroundVideo } from "@/hooks/useBackgroundVideo";
import { siteVideos } from "@/lib/videos";
import { productionStepImage } from "@/lib/media";
import { useCmsMedia } from "@/hooks/useCmsMedia";
import { cn } from "@/lib/utils";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const steps = ["0", "1", "2", "3", "4", "5", "6", "7"] as const;

export function ProductionProcess() {
  const t = useTranslations("production");
  const cms = useCmsMedia();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [motionOk, setMotionOk] = useState(true);

  useBackgroundVideo(videoRef, { enabled: motionOk });

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      gsap.from(".prod-head", {
        autoAlpha: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".prod-head-wrap", start: "top 82%" },
      });

      if (track.current) {
        gsap.fromTo(
          ".prod-line",
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
      }

      gsap.utils.toArray<HTMLElement>(".prod-step").forEach((step) => {
        gsap.from(step, {
          autoAlpha: 0,
          x: -32,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotionOk(!reduce);
  }, []);

  const stepSrc = (i: number) =>
    cms?.productionSteps?.[String(i)] || productionStepImage(i);
  const processMp4 = cms?.processVideo?.mp4 || siteVideos.process.mp4;
  const processPoster =
    cms?.processVideo?.poster || siteVideos.process.poster;

  return (
    <section
      id="production"
      className="relative isolate scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-32"
    >
      <div className="prod-bg absolute inset-x-0 -top-[6%] -z-10 h-[112%]">
        <Image
          src={processPoster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]",
            videoReady ? "opacity-100" : "opacity-0",
          )}
          poster={processPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          aria-hidden
        >
          <source src={processMp4} type="video/mp4" />
        </video>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-ink/88" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <div ref={root} className="container-luxe">
        <div className="prod-head-wrap mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <p className="prod-head eyebrow mb-5">{t("eyebrow")}</p>
          <h2 className="prod-head section-title">{t("title")}</h2>
          <p className="prod-head text-lead mx-auto mt-6 max-w-2xl text-bone-soft">
            {t("description")}
          </p>
          <p className="prod-head mt-4 font-display text-xl text-gold-soft md:text-2xl">
            {t("tagline")}
          </p>
        </div>

        <div ref={track} className="relative max-w-4xl">
          <div className="absolute bottom-2 start-[11px] top-2 w-px bg-line">
            <div className="prod-line h-full w-full origin-top bg-gradient-to-b from-gold via-gold-soft to-gold/30" />
          </div>

          <ol className="flex flex-col">
            {steps.map((key, i) => (
              <li
                key={key}
                className={cn(
                  "prod-step relative ps-14 md:ps-16",
                  i < steps.length - 1 && "pb-10 md:pb-12",
                )}
              >
                <span className="absolute top-2 start-0 z-10 h-[18px] w-[18px] -translate-x-1/2 rounded-full border-2 border-gold/40 bg-ink-600" />
                <div className="overflow-hidden rounded-luxe-lg border border-line/80 bg-ink/70 backdrop-blur-sm transition-colors hover:border-gold/30">
                  <div className="relative aspect-[2/1] w-full md:aspect-[5/2]">
                    <Image
                      src={stepSrc(i)}
                      alt={t(`steps.${key}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      quality={92}
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/55 to-ink/15" />
                    <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
                      <span className="font-display text-3xl text-gold md:text-4xl">
                        {t(`steps.${key}.number`)}
                      </span>
                      <h3 className="mt-2 text-h3 text-bone">
                        {t(`steps.${key}.title`)}
                      </h3>
                      <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-bone-dim md:text-base">
                        {t(`steps.${key}.text`)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

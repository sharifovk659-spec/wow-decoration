"use client";

import { useTranslations } from "next-intl";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

const keys = ["0", "1", "2", "3"] as const;

function TestimonialCard({
  id,
  t,
}: {
  id: (typeof keys)[number];
  t: ReturnType<typeof useTranslations<"testimonials">>;
}) {
  return (
    <article className="flex w-[min(88vw,22rem)] shrink-0 flex-col rounded-luxe-lg border border-line/80 bg-ink-800/70 p-6 md:w-[24rem] md:p-7">
      <span className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">
        {t(`items.${id}.brand`)}
      </span>

      <blockquote className="mt-4 flex-1 border-0 p-0">
        <p className="font-display text-[1.05rem] leading-relaxed text-bone-soft md:text-lg">
          {t(`items.${id}.quote`)}
        </p>
      </blockquote>

      <footer className="mt-5 border-t border-line pt-4">
        <cite className="not-italic text-sm font-medium text-bone">
          {t(`items.${id}.author`)}
        </cite>
        <p className="mt-1 text-xs leading-relaxed text-bone-dim">
          {t(`items.${id}.role`)}
        </p>
      </footer>
    </article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  speed = 45,
}: {
  items: readonly (typeof keys)[number][];
  reverse?: boolean;
  speed?: number;
}) {
  const t = useTranslations("testimonials");
  const track = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 items-stretch gap-4 pe-4 motion-reduce:animate-none",
          reverse ? "testimonial-marquee-reverse" : "testimonial-marquee",
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {track.map((key, i) => (
          <TestimonialCard key={`${key}-${i}`} id={key} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="relative overflow-hidden border-t border-line py-16 md:py-24">
      <div className="container-luxe">
        <div className="mb-12 flex items-center gap-4 md:mb-16">
          <span className="h-px w-10 bg-gold/60" />
          <span className="eyebrow">{t("eyebrow")}</span>
        </div>

        <AnimatedText
          text={t("title")}
          as="h2"
          className="text-h2 mb-12 max-w-3xl text-bone md:mb-16"
        />
      </div>

      <div className="flex flex-col gap-5 md:gap-6">
        <MarqueeRow items={keys} speed={42} />
        <MarqueeRow items={[...keys].reverse()} reverse speed={48} />
      </div>
    </section>
  );
}

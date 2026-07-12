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

      <p className="mt-4 flex-1 font-display text-lg leading-snug text-bone-soft md:text-xl">
        <span className="text-gold">“</span>
        {t(`items.${id}.quote`)}
        <span className="text-gold">”</span>
      </p>

      <footer className="mt-5 border-t border-line pt-4">
        <cite className="not-italic text-sm font-medium text-bone">
          {t(`items.${id}.author`)}
        </cite>
        <p className="mt-1 text-xs text-bone-dim">{t(`items.${id}.role`)}</p>
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
          className="section-title max-w-4xl"
        />

        <p className="mt-6 max-w-4xl text-base leading-relaxed text-bone-dim sm:text-lead md:mt-8">
          {t("description")}
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-5 md:mt-16 md:gap-6">
        <MarqueeRow items={keys} speed={42} />
        <MarqueeRow items={[...keys].reverse()} reverse speed={48} />
      </div>
    </section>
  );
}

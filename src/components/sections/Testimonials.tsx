"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { AnimatedText } from "@/components/ui/AnimatedText";
import "swiper/css";

const keys = ["0", "1", "2", "3"] as const;

function TestimonialCard({
  id,
  t,
}: {
  id: (typeof keys)[number];
  t: ReturnType<typeof useTranslations<"testimonials">>;
}) {
  return (
    <article className="flex h-full w-[min(88vw,22rem)] flex-col rounded-luxe-lg border border-line/80 bg-ink-800/70 p-6 md:w-[24rem] md:p-7">
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

export function Testimonials() {
  const t = useTranslations("testimonials");
  const rowA = [...keys, ...keys];
  const rowB = [...[...keys].reverse(), ...[...keys].reverse()];

  return (
    <section className="relative overflow-hidden border-t border-line py-20 md:py-32">
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
        <Swiper
          modules={[Autoplay, A11y]}
          loop
          speed={7000}
          spaceBetween={16}
          slidesPerView="auto"
          allowTouchMove
          grabCursor
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          className="testimonial-marquee !px-4 sm:!px-6"
        >
          {rowA.map((key, i) => (
            <SwiperSlide key={`top-${key}-${i}`} className="!h-auto !w-auto">
              <TestimonialCard id={key} t={t} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Autoplay, A11y]}
          loop
          speed={7000}
          spaceBetween={16}
          slidesPerView="auto"
          allowTouchMove
          grabCursor
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          className="testimonial-marquee !px-4 sm:!px-6"
        >
          {rowB.map((key, i) => (
            <SwiperSlide key={`bottom-${key}-${i}`} className="!h-auto !w-auto">
              <TestimonialCard id={key} t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { HiArrowLongLeft, HiArrowLongRight, HiPlay } from "react-icons/hi2";
import { rtlLocales, type Locale } from "@/i18n/routing";
import { videoTestimonials } from "@/lib/videoTestimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoModal } from "@/components/ui/VideoModal";
import "swiper/css";

export function VideoTestimonials() {
  const t = useTranslations("videoTestimonials");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const isRtl = rtlLocales.includes(locale);
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const current = active !== null ? videoTestimonials[active] : null;

  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-800 py-28 md:py-48">
      <div className="container-luxe">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <HiArrowLongLeft className="text-xl rtl:rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <HiArrowLongRight className="text-xl rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <Swiper
          key={locale}
          dir={isRtl ? "rtl" : "ltr"}
          modules={[Navigation, Keyboard, A11y, Mousewheel]}
          onSwiper={(s) => (swiperRef.current = s)}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          grabCursor
          speed={700}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            430: { slidesPerView: 1.05, spaceBetween: 20 },
            640: { slidesPerView: 1.8, spaceBetween: 28 },
            1024: { slidesPerView: 2.4, spaceBetween: 32 },
            1440: { slidesPerView: 3, spaceBetween: 36 },
          }}
          className="!px-[30px]"
        >
          {videoTestimonials.map((item, i) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <button
                type="button"
                onClick={() => setActive(i)}
                data-cursor="hover"
                className="group relative block w-full overflow-hidden rounded-luxe-lg text-start shadow-image transition-shadow duration-700 hover:shadow-luxe-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              >
                <div className="relative aspect-[9/16] w-full">
                  <Image
                    src={item.poster}
                    alt={t(`items.${item.id}.author`)}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 32vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />

                  {/* Duration */}
                  <span className="absolute end-4 top-4 rounded-full border border-bone/25 bg-ink/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                    {item.duration}
                  </span>

                  {/* Play affordance */}
                  <span className="absolute left-1/2 top-[38%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/40 bg-ink/25 text-bone backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/15 group-hover:text-gold">
                      <HiPlay className="ms-0.5 text-2xl" />
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-bone/0 transition-colors duration-500 group-hover:text-bone/85">
                      {t("watch")}
                    </span>
                  </span>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <span className="mb-4 flex items-center gap-3 text-gold">
                      <span className="h-px w-6 bg-gold/70" />
                      <span className="text-xs uppercase tracking-[0.2em]">
                        {t(`items.${item.id}.project`)}
                      </span>
                    </span>
                    <p className="font-display text-lg leading-snug text-bone-soft">
                      <span className="text-gold">“</span>
                      {t(`items.${item.id}.quote`)}
                      <span className="text-gold">”</span>
                    </p>
                    <div className="mt-5 border-t border-bone/15 pt-4">
                      <p className="text-sm font-medium text-bone">
                        {t(`items.${item.id}.author`)}
                      </p>
                      <p className="text-xs text-bone-dim">
                        {t(`items.${item.id}.role`)}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <VideoModal
        open={active !== null}
        youtubeId={current?.youtubeId ?? null}
        poster={current?.poster}
        onClose={() => setActive(null)}
        closeLabel={tc("close")}
        caption={
          current ? t(`items.${current.id}.author`) : undefined
        }
      />
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { HiPlay } from "react-icons/hi2";
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
  const loopItems = [...videoTestimonials, ...videoTestimonials];

  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-800 py-20 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </div>

      <div className="mt-10 md:mt-14">
        <Swiper
          key={locale}
          dir={isRtl ? "rtl" : "ltr"}
          modules={[Autoplay, Keyboard, A11y]}
          onSwiper={(s) => (swiperRef.current = s)}
          keyboard={{ enabled: true }}
          loop
          speed={6000}
          spaceBetween={14}
          slidesPerView="auto"
          allowTouchMove
          grabCursor
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="video-marquee !px-4 sm:!px-6"
        >
          {loopItems.map((item, i) => (
            <SwiperSlide
              key={`${item.id}-${i}`}
              className="!h-auto !w-[11.5rem] sm:!w-[12.5rem]"
            >
              <button
                type="button"
                onClick={() => setActive(i % videoTestimonials.length)}
                data-cursor="hover"
                className="group relative block w-full overflow-hidden rounded-luxe-lg text-start shadow-image transition-shadow duration-500 hover:shadow-luxe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              >
                <div className="relative aspect-[9/16] w-full">
                  <Image
                    src={item.poster}
                    alt={t(`items.${item.id}.author`)}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5" />

                  <span className="absolute end-2.5 top-2.5 rounded-full border border-bone/25 bg-ink/30 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-bone backdrop-blur-sm">
                    {item.duration}
                  </span>

                  <span className="absolute left-1/2 top-[36%] flex -translate-x-1/2 -translate-y-1/2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/40 bg-ink/25 text-bone backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/15 group-hover:text-gold">
                      <HiPlay className="ms-0.5 text-lg" />
                    </span>
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                    <span className="mb-2 flex items-center gap-2 text-gold">
                      <span className="h-px w-4 bg-gold/70" />
                      <span className="text-[0.6rem] uppercase tracking-[0.18em]">
                        {t(`items.${item.id}.project`)}
                      </span>
                    </span>
                    <p className="line-clamp-2 font-display text-sm leading-snug text-bone-soft">
                      <span className="text-gold">“</span>
                      {t(`items.${item.id}.quote`)}
                      <span className="text-gold">”</span>
                    </p>
                    <div className="mt-3 border-t border-bone/15 pt-2.5">
                      <p className="text-xs font-medium text-bone">
                        {t(`items.${item.id}.author`)}
                      </p>
                      <p className="text-[0.65rem] text-bone-dim">
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

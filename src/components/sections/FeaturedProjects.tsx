"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { HoverVideo } from "@/components/ui/HoverVideo";
import { rtlLocales } from "@/i18n/routing";
import "swiper/css";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const isRtl = rtlLocales.includes(locale);
  const projects = getFeaturedProjects();
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative overflow-hidden py-28 md:py-48">
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
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 1.8, spaceBetween: 28 },
            1024: { slidesPerView: 2.6, spaceBetween: 32 },
            1440: { slidesPerView: 3.2, spaceBetween: 36 },
          }}
          className="!px-[clamp(1.25rem,0.5rem+3vw,5rem)]"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.slug} className="!h-auto">
              <Link
                href={`/projects/${project.slug}`}
                className="group block"
                data-cursor="hover"
              >
                <div className="relative">
                  <HoverVideo
                    src={project.cover}
                    video={project.video}
                    alt={project.title[locale]}
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
                    className="aspect-[3/4] w-full rounded-luxe-lg shadow-image transition-shadow duration-700 group-hover:shadow-luxe-lg"
                    imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-luxe-lg bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="rounded-full border border-bone/25 bg-ink/30 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                      {t(`filters.${project.category}`)}
                    </span>
                    <span className="font-display text-lg text-bone/80">
                      {project.year}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-h3 text-bone">{project.title[locale]}</h3>
                    <div className="mt-2 flex items-center gap-2 overflow-hidden">
                      <span className="text-sm text-gold-soft">
                        {project.location[locale]}
                      </span>
                      <span className="h-px flex-1 origin-left scale-x-0 bg-gold/40 transition-transform duration-500 group-hover:scale-x-100" />
                      <span className="translate-x-2 text-xs uppercase tracking-[0.15em] text-bone opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                        {t("viewProject")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container-luxe mt-14 flex justify-center">
        <ButtonLink href="/projects" variant="outline" withArrow>
          {t("cta")}
        </ButtonLink>
      </div>
    </section>
  );
}

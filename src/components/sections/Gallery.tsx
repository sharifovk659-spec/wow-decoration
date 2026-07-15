"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowsPointingOut } from "react-icons/hi2";
import {
  galleryItems,
  galleryCategories,
  galleryThumb,
  galleryFull,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";
import { easeLuxe, fadeUp, staggerContainer } from "@/lib/motion";
import { useCmsMedia } from "@/hooks/useCmsMedia";

type Filter = GalleryCategory | "all";

export function Gallery() {
  const t = useTranslations("gallery");
  const tc = useTranslations("common");
  const cms = useCmsMedia();
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: Filter[] = ["all", ...galleryCategories];

  const items: GalleryItem[] = cms?.gallery ?? galleryItems;

  const visible = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((item) => item.category === filter),
    [filter, items],
  );

  const fullImages = useMemo(
    () => visible.map((item) => galleryFull(item)),
    [visible],
  );

  return (
    <section className="container-luxe pb-[30px]">
      <div className="mb-luxe flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-line pb-6">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            data-cursor="hover"
            className={cn(
              "relative text-sm uppercase tracking-[0.15em] transition-colors duration-300 rtl:tracking-[0.05em]",
              filter === f ? "text-gold" : "text-bone-dim hover:text-bone",
            )}
          >
            {t(`categories.${f}`)}
            {filter === f && (
              <motion.span
                layoutId="gallery-underline"
                className="absolute -bottom-[1.6rem] left-0 h-px w-full bg-gold"
                transition={{ duration: 0.4, ease: easeLuxe }}
              />
            )}
          </button>
        ))}
        <span className="ms-auto font-display text-lg text-bone-faint">
          {String(visible.length).padStart(2, "0")}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={staggerContainer(0.04)}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {visible.map((item, i) => (
            <motion.button
              key={item.key}
              variants={fadeUp}
              type="button"
              data-cursor="hover"
              onClick={() => setLightboxIndex(i)}
              aria-label={tc("fullscreen")}
              className="group block w-full overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-900 shadow-image transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-luxe-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={galleryThumb(item)}
                  alt={t(`categories.${item.category}`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={95}
                  className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />

                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="text-xs uppercase tracking-[0.2em] text-bone rtl:tracking-[0.1em]">
                    {t(`categories.${item.category}`)}
                  </span>
                </div>

                <span className="pointer-events-none absolute end-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-bone/40 bg-ink/40 text-bone opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <HiArrowsPointingOut className="text-base" />
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      <Lightbox
        images={fullImages}
        index={lightboxIndex ?? 0}
        open={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        alt={(i) => t(`categories.${visible[i]?.category ?? "interiors"}`)}
        labels={{
          close: tc("close"),
          previous: tc("previous"),
          next: tc("next"),
          fullscreen: tc("fullscreen"),
        }}
      />
    </section>
  );
}

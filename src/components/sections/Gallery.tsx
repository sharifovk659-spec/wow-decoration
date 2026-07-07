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
} from "@/lib/gallery";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";
import { easeLuxe, fadeUp, staggerContainer } from "@/lib/motion";

type Filter = GalleryCategory | "all";

export function Gallery() {
  const t = useTranslations("gallery");
  const tc = useTranslations("common");
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: Filter[] = ["all", ...galleryCategories];

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  const fullImages = useMemo(
    () => visible.map((item) => galleryFull(item)),
    [visible],
  );

  return (
    <section className="container-luxe pb-28 md:pb-40">
      {/* Filters */}
      <div className="mb-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-line pb-6 md:mb-16">
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

      {/* Masonry */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className="columns-1 gap-6 sm:columns-2 lg:columns-3"
        >
          {visible.map((item, i) => (
            <motion.button
              key={item.key}
              variants={fadeUp}
              type="button"
              data-cursor="hover"
              onClick={() => setLightboxIndex(i)}
              aria-label={tc("fullscreen")}
              className="group mb-6 block w-full break-inside-avoid overflow-hidden rounded-luxe-lg shadow-image"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={galleryThumb(item)}
                  alt={t(`categories.${item.category}`)}
                  width={item.ratio[0] * 240}
                  height={item.ratio[1] * 240}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/75 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { easeLuxe } from "@/lib/motion";

const keys = ["0", "1", "2"] as const;

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const paginate = (step: number) => {
    setState(([i]) => [(i + step + keys.length) % keys.length, step]);
  };

  const active = keys[index]!;

  return (
    <section className="relative border-t border-line py-28 md:py-48">
      <div className="container-luxe">
        <div className="mb-14 flex items-center gap-4">
          <span className="h-px w-10 bg-gold/60" />
          <span className="eyebrow">{t("eyebrow")}</span>
        </div>

        <AnimatedText
          text={t("title")}
          as="h2"
          className="text-h2 mb-16 max-w-3xl text-bone"
        />

        <div className="relative min-h-[16rem] md:min-h-[14rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: easeLuxe }}
              className="max-w-4xl"
            >
              <p className="font-display text-3xl leading-tight text-bone-soft md:text-4xl lg:text-5xl">
                <span className="text-gold">“</span>
                {t(`items.${active}.quote`)}
                <span className="text-gold">”</span>
              </p>
              <footer className="mt-10 flex flex-col gap-1">
                <cite className="not-italic text-base font-medium text-bone">
                  {t(`items.${active}.author`)}
                </cite>
                <span className="text-sm text-bone-dim">
                  {t(`items.${active}.role`)}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-line pt-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => paginate(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <HiArrowLongLeft className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => paginate(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <HiArrowLongRight className="rtl:rotate-180" />
            </button>
          </div>
          <span className="font-display text-xl text-bone-dim">
            <span className="text-gold">{String(index + 1).padStart(2, "0")}</span>
            {" / "}
            {String(keys.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

/** Six offerings, mapped to fitting portfolio imagery. */
const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=80",
];

const keys = ["0", "1", "2", "3", "4", "5"] as const;

export function ServiceCards({ withHeading = true }: { withHeading?: boolean }) {
  const t = useTranslations("serviceCards");

  return (
    <section className="relative border-t border-line py-28 md:py-48">
      <div className="container-luxe">
        {withHeading && (
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-16 md:mb-20"
          />
        )}

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {keys.map((key, i) => (
            <motion.div key={key} variants={fadeUp}>
              <Link
                href="/contact"
                data-cursor="hover"
                className="group relative block overflow-hidden rounded-luxe-lg shadow-luxe transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-image focus-visible:-translate-y-1.5"
              >
                {/* Image + zoom */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={CARD_IMAGES[i]!}
                    alt={t(`items.${key}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-focus-visible:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gold-deep/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>

                {/* Gold frame */}
                <div className="pointer-events-none absolute inset-0 rounded-luxe-lg ring-1 ring-inset ring-cream/10 transition-colors duration-500 group-hover:ring-gold/40" />

                {/* Index + gold accent */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className="font-display text-lg text-gold">
                    {t(`items.${key}.tag`)}
                  </span>
                  <span className="h-px w-10 origin-right bg-gold/70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[1.6]" />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <h3 className="text-h3 text-bone">
                    {t(`items.${key}.title`)}
                  </h3>

                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-3 max-w-xs text-sm text-bone-dim">
                        {t(`items.${key}.text`)}
                      </p>
                    </div>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:-translate-x-2 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 rtl:tracking-[0.08em]">
                    {t("cta")}
                    <HiArrowLongRight className="text-sm transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

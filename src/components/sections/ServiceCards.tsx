"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { siteImage } from "@/lib/media";

const CARD_IMAGES = [
  siteImage("projects/private-villa-interior.jpg"),
  siteImage("gallery/gazebo-royal.jpg"),
  siteImage("projects/parliament-tajikistan.jpg"),
  siteImage("gallery/furniture.jpg"),
  siteImage("gallery/islamic.jpg"),
  siteImage("projects/expo-dubai.jpg"),
];

const keys = ["0", "1", "2", "3", "4", "5"] as const;

export function ServiceCards({ withHeading = true }: { withHeading?: boolean }) {
  const t = useTranslations("serviceCards");

  return (
    <section
      id="directions"
      className="relative scroll-mt-28 border-t border-line bg-ink py-20 md:scroll-mt-32 md:py-32"
    >
      <div className="container-luxe">
        {withHeading && (
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            descriptionClassName="max-w-5xl text-pretty leading-relaxed"
            className="mb-16 max-w-none md:mb-20"
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
                className="group relative block overflow-hidden rounded-luxe-lg bg-ink-800 shadow-luxe transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-image focus-visible:-translate-y-2"
              >
                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={CARD_IMAGES[i]!}
                    alt={t(`items.${key}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={92}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-deep/10 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-gold/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-luxe-lg ring-1 ring-inset ring-cream/10 transition-colors duration-500 group-hover:ring-gold/45" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 md:p-7">
                  <span className="font-display text-2xl leading-none text-gold md:text-3xl">
                    {t(`items.${key}.tag`)}
                  </span>
                  <span className="h-px w-12 origin-right bg-gradient-to-r from-transparent to-gold/80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[1.5]" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="text-h3 text-bone">{t(`items.${key}.title`)}</h3>

                  <div className="mt-3">
                    <p className="max-w-sm text-sm leading-relaxed text-bone-dim">
                      {t(`items.${key}.text`)}
                    </p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold">
                    {t("cta")}
                    <HiArrowLongRight className="text-sm transition-transform duration-500 group-hover:translate-x-1" />
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

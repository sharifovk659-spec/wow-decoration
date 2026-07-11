"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { siteImage } from "@/lib/media";
import { cn } from "@/lib/utils";

const items = ["0", "1", "2", "3", "4", "5", "6"] as const;
const ITEM_COUNT = items.length;

const MATERIAL_HERO = siteImage("materials/wood-grain.jpg");

/** 1 Дуб · 2 Орех · 3 Бук · 4 Ясень · 5 Сосна · 6 Кедра · 7 Абачи */
const MATERIAL_IMAGES = [
  siteImage("materials/woods/oak.jpg"),
  siteImage("materials/woods/walnut.jpg"),
  siteImage("materials/woods/beech.jpg"),
  siteImage("materials/woods/ash.jpg"),
  siteImage("materials/woods/pine.jpg"),
  siteImage("materials/woods/cedar.jpg"),
  siteImage("materials/woods/abachi.jpg"),
] as const;

export function Materials() {
  const t = useTranslations("materials");
  const [hovered, setHovered] = useState<number | null>(null);

  const showWood = hovered !== null;
  const counterIndex = hovered ?? 0;

  return (
    <section className="relative overflow-hidden section">
      <div className="container-luxe grid gap-8 lg:grid-cols-12 lg:gap-luxe">
        <div className="order-2 flex flex-col lg:order-1 lg:col-span-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-8 sm:mb-10"
          />

          <ul
            className="border-t border-line"
            onMouseLeave={() => setHovered(null)}
          >
            {items.map((key, i) => (
              <li key={key}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onClick={() => setHovered(i)}
                  className="group flex w-full items-center gap-4 border-b border-line py-4 text-start transition-colors sm:py-5"
                >
                  <span className="font-display text-lg text-gold/70 sm:text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span
                      className={cn(
                        "text-lg transition-colors duration-300 sm:text-xl",
                        hovered === i ? "text-gold" : "text-bone",
                      )}
                    >
                      {t(`items.${key}.name`)}
                    </span>
                    <span className="text-sm leading-relaxed text-bone-dim">
                      {t(`items.${key}.note`)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 sm:mt-10">
            <ButtonLink href="/contact" variant="ghost" withArrow>
              {t("cta")}
            </ButtonLink>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative aspect-[4/3] w-full overflow-hidden rounded-luxe-lg border border-line shadow-luxe-lg sm:aspect-square lg:sticky lg:top-28",
              showWood ? "bg-ink-900" : "bg-ink-900",
            )}
          >
            <AnimatePresence mode="sync">
              {showWood ? (
                <motion.div
                  key={`wood-${hovered}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={MATERIAL_IMAGES[hovered]!}
                    alt={t(`items.${items[hovered]}.name`)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={95}
                    className="object-cover object-center"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="material-hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={MATERIAL_HERO}
                    alt={t("eyebrow")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={95}
                    priority
                    className="object-cover object-center"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-500",
                showWood
                  ? "from-ink/55 via-transparent to-ink/10 opacity-100"
                  : "from-ink/25 via-transparent to-transparent opacity-100",
              )}
            />
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between p-4 sm:p-6">
              <span className="eyebrow">{t("eyebrow")}</span>
              <span className="font-display text-base text-bone-soft sm:text-lg">
                {String(counterIndex + 1).padStart(2, "0")} /{" "}
                {String(ITEM_COUNT).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

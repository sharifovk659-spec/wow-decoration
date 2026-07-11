"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { siteImage } from "@/lib/media";

/** 1 Дуб · 2 Орех · 3 Бук · 4 Ясень · 5 Сосна · 6 Кедра · 7 Абачи */
const WOODS = [
  { img: siteImage("materials/oak.jpg"), latin: "Quercus robur", tone: "#8a5f2e" },
  { img: siteImage("materials/walnut.jpg"), latin: "Juglans regia", tone: "#3d2817" },
  { img: siteImage("materials/beech.jpg"), latin: "Fagus sylvatica", tone: "#b07d4f" },
  { img: siteImage("materials/ash.jpg"), latin: "Fraxinus excelsior", tone: "#b79a6b" },
  { img: siteImage("materials/pine.jpg"), latin: "Pinus sylvestris", tone: "#c9a468" },
  { img: siteImage("materials/cedar.jpg"), latin: "Cedrus libani", tone: "#94502f" },
  { img: siteImage("materials/abachi.jpg"), latin: "Triplochiton scleroxylon", tone: "#d8c39a" },
] as const;

const src = (path: string) => path;

const keys = ["0", "1", "2", "3", "4", "5", "6"] as const;

export function WoodMaterials() {
  const t = useTranslations("woods");

  return (
    <section
      id="materials"
      className="relative scroll-mt-28 overflow-hidden border-t border-line py-28 md:scroll-mt-32 md:py-48"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-16 md:mb-20"
        />

        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {keys.map((key, i) => {
            const wood = WOODS[i]!;

            return (
              <motion.article
                key={key}
                variants={fadeUp}
                data-cursor="hover"
                className="group relative flex flex-col overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-800 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-gold/45 hover:shadow-gold"
              >
                <div className="relative h-52 overflow-hidden sm:h-56">
                  <Image
                    src={src(wood.img)}
                    alt={t(`items.${key}.name`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-10"
                    style={{ backgroundColor: wood.tone }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/5 via-transparent to-ink/75" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="font-display text-xl text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3 text-bone">{t(`items.${key}.name`)}</h3>
                  <span className="mt-1 font-display text-sm italic text-gold-soft/80">
                    {wood.latin}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                    {t(`items.${key}.note`)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-14 flex justify-center md:mt-16">
          <ButtonLink href="/contact" variant="ghost" withArrow>
            {t("cta")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

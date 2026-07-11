"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { siteImage } from "@/lib/media";

/** 1 Дуб · 2 Орех · 3 Бук · 4 Ясень · 5 Сосна · 6 Кедра · 7 Абачи */
const WOODS = [
  { img: siteImage("materials/woods/oak.jpg"), latin: "Quercus robur" },
  { img: siteImage("materials/woods/walnut.jpg"), latin: "Juglans regia" },
  { img: siteImage("materials/woods/beech.jpg"), latin: "Fagus sylvatica" },
  { img: siteImage("materials/woods/ash.jpg"), latin: "Fraxinus excelsior" },
  { img: siteImage("materials/woods/pine.jpg"), latin: "Pinus sylvestris" },
  { img: siteImage("materials/woods/cedar.jpg"), latin: "Cedrus libani" },
  { img: siteImage("materials/woods/abachi.jpg"), latin: "Triplochiton scleroxylon" },
] as const;

const keys = ["0", "1", "2", "3", "4", "5", "6"] as const;

export function WoodMaterials() {
  const t = useTranslations("woods");

  return (
    <section
      id="materials"
      className="relative scroll-mt-28 overflow-hidden border-t border-line py-20 md:scroll-mt-32 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          titleClassName="max-w-3xl"
          descriptionClassName="max-w-2xl"
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
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={wood.img}
                    alt={t(`items.${key}.name`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={92}
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="font-display text-xl text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-h3 text-bone">{t(`items.${key}.name`)}</h3>
                  <span className="mt-1.5 font-display text-[0.9375rem] italic text-gold-soft/80 md:text-base">
                    {wood.latin}
                  </span>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone-dim md:text-base">
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

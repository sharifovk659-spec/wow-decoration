"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Seven signature timbers. Imagery maps to validated portfolio photography
 * and is warmed per species via a `tone` wash so each card reads as its wood.
 * Latin names are locale-neutral. To use true macro photography later,
 * drop files in `public/images/woods/<slug>.jpg` and swap `img` below.
 */
const WOODS = [
  { img: "1600585154340-be6161a56a0c", latin: "Juglans nigra", tone: "#432a17" }, // Walnut
  { img: "1600566752355-35792bedcfea", latin: "Quercus robur", tone: "#8a5f2e" }, // Oak
  { img: "1600607687939-ce8a6c25118c", latin: "Fraxinus excelsior", tone: "#b79a6b" }, // Ash
  { img: "1600566753086-00f18fb6b3ea", latin: "Fagus sylvatica", tone: "#b07d4f" }, // Beech
  { img: "1585036156171-384164a8c675", latin: "Cedrus libani", tone: "#94502f" }, // Cedar
  { img: "1618221195710-dd6b41faaea6", latin: "Pinus sylvestris", tone: "#c9a468" }, // Pine
  { img: "1615529182904-14819c35db37", latin: "Triplochiton scleroxylon", tone: "#d8c39a" }, // Abachi
] as const;

const src = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1100&q=80`;

const keys = ["0", "1", "2", "3", "4", "5", "6"] as const;

export function WoodMaterials() {
  const t = useTranslations("woods");

  return (
    <section className="relative overflow-hidden border-t border-line py-28 md:py-48">
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
        >
          {keys.map((key, i) => {
            const wood = WOODS[i]!;
            const featured = i === 0;

            return (
              <motion.article
                key={key}
                variants={fadeUp}
                data-cursor="hover"
                className={cn(
                  "card-luxe group relative flex flex-col overflow-hidden",
                  featured && "sm:col-span-2 lg:col-span-2",
                )}
              >
                {/* Macro photo */}
                <div className="relative h-56 overflow-hidden sm:h-60 lg:h-64">
                  <Image
                    src={src(wood.img)}
                    alt={t(`items.${key}.name`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="scale-105 object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />

                  {/* Species tone wash — recedes on hover to reveal the grain */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-50 mix-blend-multiply transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-20"
                    style={{ backgroundColor: wood.tone }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/70" />

                  {/* Sheen sweep */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/15 to-transparent transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />

                  {/* Index + origin */}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="font-display text-lg leading-none text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-bone-soft rtl:tracking-[0.08em]">
                      {t(`items.${key}.origin`)}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="relative flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-inset ring-cream/25 transition-shadow duration-500 group-hover:ring-gold/60"
                      style={{ backgroundColor: wood.tone }}
                    />
                    <h3 className="text-h3 leading-none text-bone">
                      {t(`items.${key}.name`)}
                    </h3>
                  </div>

                  <span className="mt-2 font-display text-sm italic text-gold-soft/80">
                    {wood.latin}
                  </span>

                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone-dim">
                    {t(`items.${key}.note`)}
                  </p>
                </div>

                {/* Gold baseline that draws in on hover */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/70 via-gold/40 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rtl:origin-right" />
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

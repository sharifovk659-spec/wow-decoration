"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const WoodObject = dynamic(() => import("@/components/three/WoodObject"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <span className="h-10 w-10 animate-spin rounded-full border border-line border-t-gold" />
    </div>
  ),
});

const items = ["0", "1", "2", "3"] as const;
const colors = ["#4a2f1b", "#a9793f", "#241a12", "#8a5a2b"];

export function Materials() {
  const t = useTranslations("materials");
  const [active, setActive] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const inView = useInView(canvasRef, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden py-28 md:py-48">
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="order-2 flex flex-col lg:order-1 lg:col-span-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-10"
          />

          <ul className="border-t border-line">
            {items.map((key, i) => (
              <li key={key}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex w-full items-center justify-between gap-6 border-b border-line py-6 text-start transition-colors"
                >
                  <span className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-h3 transition-colors duration-300",
                        active === i ? "text-gold" : "text-bone",
                      )}
                    >
                      {t(`items.${key}.name`)}
                    </span>
                    <span className="text-sm text-bone-dim">
                      {t(`items.${key}.note`)}
                    </span>
                  </span>
                  <span className="text-xs uppercase tracking-[0.15em] text-bone-faint">
                    {t(`items.${key}.origin`)}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ButtonLink href="/contact" variant="ghost" withArrow>
              {t("cta")}
            </ButtonLink>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <motion.div
            ref={canvasRef}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-full overflow-hidden rounded-luxe-lg border border-line bg-gradient-to-b from-walnut-800 to-ink shadow-luxe-lg"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(184,150,90,0.18),transparent_60%)]" />
            {inView && <WoodObject color={colors[active]!} />}
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between p-6">
              <span className="eyebrow">{t("eyebrow")}</span>
              <span className="font-display text-lg text-bone-soft">
                {String(active + 1).padStart(2, "0")} / 04
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

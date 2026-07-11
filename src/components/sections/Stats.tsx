"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { photoUrl } from "@/lib/media";

const STATS_IMG = photoUrl("1615529182904-14819c35db37");

const stats = [
  { value: 10, suffix: "+" },
  { value: 18, suffix: "" },
  { value: 180, suffix: "+" },
  { value: 120, suffix: "" },
];

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="relative isolate overflow-hidden py-28 md:py-48">
      <Image
        src={STATS_IMG}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-ink/85" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink" />

      <div className="container-luxe">
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="eyebrow mb-5"
          >
            {t("eyebrow")}
          </motion.p>
          <AnimatedText
            text={t("title")}
            as="h2"
            className="text-h2 text-bone"
          />
        </div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 gap-y-14 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
            >
              <span className="font-display text-6xl text-brass md:text-7xl lg:text-8xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-4 max-w-[12rem] text-xs uppercase tracking-[0.18em] text-bone-dim">
                {t(`items.${i}.label`)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

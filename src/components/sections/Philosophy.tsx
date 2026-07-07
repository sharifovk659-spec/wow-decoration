"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { photoUrl } from "@/lib/media";

const PHILOSOPHY_IMG = photoUrl("1616486338812-3dadae4b4ace");

const pillarKeys = ["0", "1", "2"] as const;

export function Philosophy() {
  const t = useTranslations("philosophy");

  return (
    <section className="relative py-28 md:py-48">
      <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <ParallaxImage
            src={PHILOSOPHY_IMG}
            alt="Master joiner shaping architectural woodwork"
            className="aspect-[4/5] w-full rounded-luxe-lg shadow-image"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <Reveal className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="eyebrow">{t("eyebrow")}</span>
          </Reveal>

          <AnimatedText
            text={t("title")}
            as="h2"
            className="text-h2 max-w-2xl text-bone"
          />

          <div className="mt-8 flex flex-col gap-6 text-lead text-bone-dim">
            <Reveal delay={0.1}>
              <p>{t("paragraph1")}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>{t("paragraph2")}</p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="mt-8">
            <p className="font-display text-xl italic text-gold-soft">
              {t("signature")}
            </p>
          </Reveal>
        </div>
      </div>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="container-luxe mt-24 grid gap-6 md:mt-32 md:grid-cols-3 md:gap-8"
      >
        {pillarKeys.map((key) => (
          <motion.div
            key={key}
            variants={fadeUp}
            className="card-luxe group p-9 md:p-11"
          >
            <span className="font-display text-5xl text-gold/40 transition-colors duration-500 group-hover:text-gold">
              0{Number(key) + 1}
            </span>
            <h3 className="mt-8 text-h3 text-bone">
              {t(`pillars.${key}.title`)}
            </h3>
            <p className="mt-4 text-bone-dim">{t(`pillars.${key}.text`)}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

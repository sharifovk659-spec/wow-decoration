"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { siteImage } from "@/lib/media";

const PHILOSOPHY_IMG = siteImage("philosophy/kohi-hall.jpg");

const pillarKeys = ["0", "1", "2"] as const;

export function Philosophy() {
  const t = useTranslations("philosophy");

  return (
    <section className="relative py-28 md:py-48">
      <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-6">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-luxe-lg shadow-image">
            <Image
              src={PHILOSOPHY_IMG}
              alt="Kohi Navruz — grand carved wood interior"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={92}
              priority
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 rounded-luxe-lg ring-1 ring-inset ring-gold/15" />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6">
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

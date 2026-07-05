"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ButtonLink } from "@/components/ui/Button";
import { easeLuxe } from "@/lib/motion";

const CTA_IMG =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80";

export function CallToAction() {
  const t = useTranslations("cta");

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={CTA_IMG}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(184,150,90,0.15),transparent_65%)]" />

      <div className="container-luxe flex flex-col items-center py-28 text-center md:py-40">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="eyebrow mb-6"
        >
          {t("eyebrow")}
        </motion.p>

        <AnimatedText
          text={t("title")}
          as="h2"
          className="text-h1 max-w-4xl text-bone"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeLuxe }}
          className="text-lead mt-8 max-w-xl text-bone-dim"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: easeLuxe }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <ButtonLink href="/contact" variant="primary" withArrow>
            {t("button")}
          </ButtonLink>
          <span className="text-xs uppercase tracking-[0.2em] text-bone-faint">
            {t("note")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

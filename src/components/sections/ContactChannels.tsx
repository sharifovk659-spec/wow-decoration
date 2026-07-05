"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FaWhatsapp, FaTelegram } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlinePhone, HiArrowLongRight } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { siteConfig } from "@/lib/site";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Channel {
  key: "whatsapp" | "telegram" | "email" | "phone";
  icon: IconType;
  href: string;
  value: string;
  action: "open" | "write" | "call";
  external?: boolean;
  ltr?: boolean;
}

const channels: Channel[] = [
  {
    key: "whatsapp",
    icon: FaWhatsapp,
    href: `https://wa.me/${siteConfig.whatsappHref}`,
    value: siteConfig.whatsapp,
    action: "open",
    external: true,
    ltr: true,
  },
  {
    key: "telegram",
    icon: FaTelegram,
    href: `https://t.me/${siteConfig.telegramHref}`,
    value: siteConfig.telegram,
    action: "open",
    external: true,
    ltr: true,
  },
  {
    key: "email",
    icon: HiOutlineEnvelope,
    href: `mailto:${siteConfig.email}`,
    value: siteConfig.email,
    action: "write",
    ltr: true,
  },
  {
    key: "phone",
    icon: HiOutlinePhone,
    href: `tel:${siteConfig.phoneHref}`,
    value: siteConfig.phone,
    action: "call",
    ltr: true,
  },
];

export function ContactChannels() {
  const t = useTranslations("contact.channels");

  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-14 md:mb-20"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.key}
                variants={fadeUp}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                data-cursor="hover"
                className="card-luxe group flex flex-col gap-6 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-xl text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                    <Icon />
                  </span>
                  <HiArrowLongRight className="text-lg text-bone-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </div>

                <div>
                  <h3 className="font-display text-xl text-bone">
                    {t(`${c.key}.label`)}
                  </h3>
                  <p className="mt-1 text-sm text-bone-dim">{t(`${c.key}.hint`)}</p>
                  <p
                    className="mt-4 text-sm text-gold-soft"
                    dir={c.ltr ? "ltr" : undefined}
                  >
                    {c.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

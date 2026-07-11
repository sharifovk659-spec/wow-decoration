"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import { HiOutlineEnvelope, HiArrowLongRight } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { siteConfig, socialLinks } from "@/lib/site";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Channel {
  key: string;
  icon: IconType;
  href: string;
  value: string;
  external?: boolean;
}

const channels: Channel[] = [
  {
    key: "whatsapp",
    icon: FaWhatsapp,
    href: `https://wa.me/${siteConfig.whatsappHref}`,
    value: siteConfig.whatsapp,
    external: true,
  },
  {
    key: "telegram",
    icon: FaTelegram,
    href: `https://t.me/${siteConfig.telegramHref}`,
    value: siteConfig.telegram,
    external: true,
  },
  {
    key: "email",
    icon: HiOutlineEnvelope,
    href: `mailto:${siteConfig.email}`,
    value: siteConfig.email,
  },
  {
    key: "instagram",
    icon: FaInstagram,
    href: socialLinks.find((s) => s.icon === "instagram")?.href ?? "#",
    value: siteConfig.instagramHandle,
    external: true,
  },
  {
    key: "facebook",
    icon: FaFacebook,
    href: socialLinks.find((s) => s.icon === "facebook")?.href ?? "#",
    value: siteConfig.instagramHandle,
    external: true,
  },
];

export function ContactChannels() {
  const t = useTranslations("contact.channels");

  return (
    <section className="relative border-t border-line py-20 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mb-14 md:mb-20"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
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
                  <p className="mt-1 text-sm text-bone-dim">
                    {t(`${c.key}.hint`)}
                  </p>
                  <p className="mt-4 break-words text-sm text-gold-soft" dir="ltr">
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

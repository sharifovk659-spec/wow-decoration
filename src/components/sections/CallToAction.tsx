"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig, socialLinks } from "@/lib/site";
import { easeLuxe, fadeUp } from "@/lib/motion";

const socialIcons: Record<string, IconType> = {
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  instagram: FaInstagram,
  facebook: FaFacebook,
};

const directChannels = [
  {
    key: "phone",
    icon: HiOutlinePhone,
    href: `tel:${siteConfig.phoneHref}`,
    label: siteConfig.phone,
  },
  {
    key: "whatsapp",
    icon: FaWhatsapp,
    href: `https://wa.me/${siteConfig.whatsappHref}`,
    label: "WhatsApp",
  },
  {
    key: "telegram",
    icon: FaTelegram,
    href: `https://t.me/${siteConfig.telegramHref}`,
    label: "Telegram",
  },
  {
    key: "email",
    icon: HiOutlineEnvelope,
    href: `mailto:${siteConfig.email}`,
    label: "Email",
  },
] as const;

export function CallToAction() {
  const t = useTranslations("cta");

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-line bg-ink py-20 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(192,160,104,0.08),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-32 top-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[100px]"
      />

      <div className="container-luxe relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-6">{t("eyebrow")}</p>
            <AnimatedText
              text={t("title")}
              as="h2"
              className="text-h1 text-bone"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: easeLuxe }}
              className="text-lead mt-8 text-bone-dim"
            >
              {t("description")}
            </motion.p>

            <div className="mt-12">
              <p className="eyebrow mb-5">{t("channelsTitle")}</p>
              <div className="flex flex-wrap gap-3">
                {directChannels.map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <a
                      key={ch.key}
                      href={ch.href}
                      target={
                        ch.key !== "email" && ch.key !== "phone"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        ch.key !== "email" && ch.key !== "phone"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      data-cursor="hover"
                      className="group flex items-center gap-3 rounded-full border border-line/80 bg-ink-800/50 px-5 py-3 text-sm text-bone-dim transition-all duration-300 hover:border-gold/40 hover:text-gold"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                        <Icon />
                      </span>
                      {ch.label}
                    </a>
                  );
                })}
                {socialLinks
                  .filter((s) => s.icon === "instagram" || s.icon === "facebook")
                  .map((social) => {
                  const Icon = socialIcons[social.icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-cursor="hover"
                      className="group flex items-center gap-3 rounded-full border border-line/80 bg-ink-800/50 px-5 py-3 text-sm text-bone-dim transition-all duration-300 hover:border-gold/40 hover:text-gold"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                        <Icon />
                      </span>
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

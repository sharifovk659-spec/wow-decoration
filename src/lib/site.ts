import type { Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "World of Wood Decoration",
  shortName: "WWD",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.worldofwooddecoration.com"
  ).replace(/\/$/, ""),
  email: "info@worldofwooddecoration.com",
  phone: "+992 900 074646",
  phoneHref: "+992900074646",
  whatsapp: "+992 937 074646",
  whatsappHref: "992937074646",
  telegram: "+992 937 074646",
  telegramHref: "+992937074646",
  instagramHandle: "@kandakori.tjk",
  linktree: "https://linktr.ee/WorldofWoodDecoration",
  ogImage: "/og.svg",
  founded: 2015,
} as const;

/** Primary navigation — labels resolved via the `nav` message namespace. */
export const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "services", href: "/services" },
  { key: "production", href: "/#production" },
  { key: "materials", href: "/#materials" },
  { key: "projects", href: "/projects" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/kandakori.tjk", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@worldofwooddecoration", icon: "youtube" },
  { label: "Facebook", href: "https://www.facebook.com/kandakori.tjk", icon: "facebook" },
  { label: "WhatsApp", href: "https://wa.me/992937074646", icon: "whatsapp" },
  { label: "Telegram", href: "https://t.me/+992937074646", icon: "telegram" },
] as const;

/** Legal / policy links surfaced in the footer. */
export const legalLinks = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/privacy#terms" },
  { key: "cookies", href: "/privacy#cookies" },
] as const;

/** OpenGraph locale codes keyed by app locale. */
export const ogLocales: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  tg: "tg_TJ",
  ar: "ar_AE",
};

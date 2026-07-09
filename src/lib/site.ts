import type { Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "World of Wood Decoration",
  shortName: "WWD",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.worldofwooddecoration.com"
  ).replace(/\/$/, ""),
  email: "info@worldofwooddecoration.com",
  phone: "+971 4 000 0000",
  phoneHref: "+97140000000",
  whatsapp: "+971 50 000 0000",
  whatsappHref: "971500000000",
  telegram: "@worldofwood",
  telegramHref: "worldofwood",
  ogImage: "/og.svg",
  founded: 2015,
} as const;

/** Primary navigation — labels resolved via the `nav` message namespace. */
export const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "production", href: "/#production" },
  { key: "materials", href: "/#materials" },
  { key: "projects", href: "/projects" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/worldofwooddecoration", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@worldofwooddecoration", icon: "youtube" },
  { label: "WhatsApp", href: "https://wa.me/971500000000", icon: "whatsapp" },
  { label: "Telegram", href: "https://t.me/worldofwood", icon: "telegram" },
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

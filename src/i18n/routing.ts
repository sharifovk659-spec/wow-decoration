import { defineRouting } from "next-intl/routing";

export const locales = ["ru", "en", "tg", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/** Locales that render right-to-left. */
export const rtlLocales: Locale[] = ["ar"];

export const localeLabels: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  tg: "Тоҷикӣ",
  ar: "العربية",
};

/** Flag + label for the header language switcher. */
export const localeConfig: Record<
  Locale,
  { flag: string; short: string; label: string }
> = {
  ru: { flag: "🇷🇺", short: "RU", label: "Русский" },
  en: { flag: "🇬🇧", short: "EN", label: "English" },
  tg: { flag: "🇹🇯", short: "TG", label: "Тоҷикӣ" },
  ar: { flag: "🇸🇦", short: "AR", label: "العربية" },
};

/** @deprecated Use localeConfig[locale].short */
export const localeShort: Record<Locale, string> = {
  ru: localeConfig.ru.short,
  en: localeConfig.en.short,
  tg: localeConfig.tg.short,
  ar: localeConfig.ar.short,
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
});

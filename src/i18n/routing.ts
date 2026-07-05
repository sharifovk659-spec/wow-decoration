import { defineRouting } from "next-intl/routing";

export const locales = ["ru", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/** Locales that render right-to-left. */
export const rtlLocales: Locale[] = ["ar"];

export const localeLabels: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  ar: "العربية",
};

/** Compact labels for the header switcher. */
export const localeShort: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  ar: "AR",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

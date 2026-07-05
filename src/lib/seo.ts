import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { siteConfig, ogLocales } from "@/lib/site";

interface BuildMetadataArgs {
  locale: Locale;
  title: string;
  description: string;
  /** Route pathname without locale prefix, e.g. "/projects". */
  path?: string;
  /** Optional explicit social image; defaults to the dynamic OG route. */
  image?: string;
}

/** Absolute URL for a localized route. */
function absoluteUrl(path: string, locale: Locale) {
  const localized = getPathname({ href: path, locale });
  return `${siteConfig.url}${localized}`;
}

/**
 * Compose page metadata with canonical + hreflang alternates and full
 * OpenGraph / Twitter cards.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = "/",
  image,
}: BuildMetadataArgs): Metadata {
  const canonical = absoluteUrl(path, locale);

  const languages = Object.fromEntries(
    locales.map((l) => [l, absoluteUrl(path, l)]),
  ) as Record<Locale, string>;

  // When no explicit image is provided the dynamic `opengraph-image`
  // route convention supplies the social card automatically.
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: siteConfig.name }]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": absoluteUrl(path, "en") },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocales[locale],
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}

import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";
import { socialLinks } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/** Organization + WebSite structured data for rich results. */
export async function JsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "meta.home" });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        foundingDate: String(siteConfig.founded),
        description: t("description"),
        sameAs: socialLinks.map((s) => s.href),
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/favicon.svg`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: locale,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

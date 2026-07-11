import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { cormorant, inter, elMessiri } from "@/app/fonts";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Cursor } from "@/components/ui/Cursor";
import { JsonLd } from "@/components/seo/JsonLd";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b0908",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    ...buildMetadata({
      locale,
      title: t("title"),
      description: t("description"),
      path: "/",
    }),
    title: {
      default: t("title"),
      template: `%s`,
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cormorant.variable} ${inter.variable} ${elMessiri.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider>
          <JsonLd locale={locale as Locale} />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
          >
            {t("skipToContent")}
          </a>
          <div className="noise-overlay" aria-hidden />
          <Cursor />
          <SmoothScroll>
            <Header />
            <main id="main" className="overflow-x-clip">
              {children}
            </main>
            <Footer />
            <FloatingContact />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

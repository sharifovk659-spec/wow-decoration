import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

const sectionKeys = ["privacy", "terms", "cookies"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/privacy",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <section className="container-luxe pb-luxe">
        <p className="eyebrow mb-luxe text-gold-soft">{t("updated")}</p>

        <div className="flex flex-col divide-y divide-line border-t border-line">
          {sectionKeys.map((key) => (
            <Reveal
              key={key}
              className="grid gap-6 py-12 md:grid-cols-12 md:gap-12 md:py-16"
            >
              <h2
                id={key}
                className="scroll-mt-32 text-h3 text-bone md:col-span-4"
              >
                {t(`sections.${key}.heading`)}
              </h2>
              <p className="max-w-2xl leading-relaxed text-bone-dim md:col-span-8">
                {t(`sections.${key}.body`)}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

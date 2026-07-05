import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Materials } from "@/components/sections/Materials";
import { CallToAction } from "@/components/sections/CallToAction";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/services",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <ServiceCards />
      <Services withHeading={false} />
      <Process />
      <Materials />
      <CallToAction />
    </>
  );
}

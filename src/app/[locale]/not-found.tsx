"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";

export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="container-luxe flex min-h-svh flex-col items-center justify-center gap-8 py-40 text-center">
      <span className="font-display text-[8rem] leading-none text-gold/20 md:text-[12rem]">
        404
      </span>
      <h1 className="text-h2 max-w-xl text-bone">{t("title")}</h1>
      <p className="max-w-md text-bone-dim">{t("description")}</p>
      <ButtonLink href="/" variant="outline" withArrow>
        {t("cta")}
      </ButtonLink>
    </section>
  );
}

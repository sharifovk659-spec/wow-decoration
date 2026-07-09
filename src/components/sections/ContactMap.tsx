"use client";

import { useTranslations } from "next-intl";
import { HiOutlineMapPin, HiArrowUpRight } from "react-icons/hi2";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export function ContactMap() {
  const t = useTranslations("contact.map");
  const query = encodeURIComponent(siteConfig.mapQuery);
  const embed = `https://www.google.com/maps?q=${query}&z=14&output=embed`;
  const link = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className="relative border-t border-line py-28 md:py-48">
      <div className="container-luxe">
        <div className="flex max-w-3xl flex-col gap-8">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-luxe border border-gold/35 bg-gold/5 px-5 py-3 text-[0.68rem] uppercase tracking-[0.14em] text-gold transition-colors hover:border-gold hover:bg-gold/10 sm:w-auto sm:self-start"
          >
            <HiOutlineMapPin className="text-base" aria-hidden />
            <span>{t("openMap")}</span>
            <HiArrowUpRight className="text-sm" aria-hidden />
          </a>
        </div>

        <Reveal className="mt-10 md:mt-12">
          <div className="overflow-hidden rounded-luxe-lg border border-line shadow-image">
            <iframe
              title={siteConfig.mapQuery}
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[min(360px,52vh)] w-full border-0 contrast-[1.05] grayscale-[0.2] md:h-[480px] lg:h-[520px]"
              allowFullScreen
            />
          </div>

          <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-bone-dim">
            <HiOutlineMapPin
              className="mt-0.5 shrink-0 text-gold"
              aria-hidden
            />
            <span>{siteConfig.mapQuery}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

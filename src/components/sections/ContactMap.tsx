"use client";

import { useTranslations } from "next-intl";
import { HiOutlineMapPin, HiArrowUpRight } from "react-icons/hi2";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export function ContactMap() {
  const t = useTranslations("contact.map");
  const query = encodeURIComponent(siteConfig.mapQuery);
  const embed = `https://www.google.com/maps?q=${query}&z=13&output=embed`;
  const link = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="container-luxe">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-bone transition-colors hover:text-gold"
          >
            {t("openMap")}
            <HiArrowUpRight className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <Reveal>
          <div className="group relative overflow-hidden rounded-luxe-lg border border-line shadow-image">
            <iframe
              title={siteConfig.mapQuery}
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full grayscale-[0.35] contrast-[1.05] transition-all duration-700 group-hover:grayscale-0 md:h-[520px]"
              style={{ border: 0 }}
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/10" />
            <div className="pointer-events-none absolute bottom-5 start-5 flex items-center gap-3 rounded-full border border-bone/15 bg-ink/70 px-5 py-2.5 text-sm text-bone backdrop-blur-md">
              <HiOutlineMapPin className="text-gold" />
              {siteConfig.mapQuery}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

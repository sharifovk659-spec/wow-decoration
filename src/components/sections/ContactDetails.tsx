"use client";

import { useTranslations } from "next-intl";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

const studioKeys = ["0", "1", "2"] as const;

export function ContactDetails() {
  const t = useTranslations("contact.details");

  return (
    <div className="card-luxe flex flex-col gap-12 p-8 md:p-10">
      <div>
        <p className="eyebrow mb-8">{t("title")}</p>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {studioKeys.map((key) => (
            <Reveal
              key={key}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <h3 className="font-display text-2xl text-bone">
                  {t(`studios.${key}.city`)}
                </h3>
                <p className="mt-1 text-sm text-bone-dim">
                  {t(`studios.${key}.address`)}
                </p>
              </div>
          <span className="text-xs uppercase tracking-[0.15em] text-gold-soft sm:shrink-0">
                {t(`studios.${key}.role`)}
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <a
          href={`mailto:${siteConfig.email}`}
          className="group flex items-center gap-4 text-bone transition-colors hover:text-gold"
        >
          <HiOutlineEnvelope className="text-xl text-gold" />
          <span className="break-all">{siteConfig.email}</span>
        </a>
        <a
          href={`tel:${siteConfig.phoneHref}`}
          className="group flex items-center gap-4 text-bone transition-colors hover:text-gold"
          dir="ltr"
        >
          <HiOutlinePhone className="text-xl text-gold" />
          <span>{siteConfig.phone}</span>
        </a>
      </div>
    </div>
  );
}

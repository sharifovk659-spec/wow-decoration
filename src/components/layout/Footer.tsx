import { useTranslations } from "next-intl";
import {
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { Link } from "@/i18n/navigation";
import { navLinks, socialLinks, legalLinks, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

const icons: Record<string, IconType> = {
  instagram: FaInstagram,
  youtube: FaYoutube,
  facebook: FaFacebook,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
};

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-800">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />

      <div className="container-luxe py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Logo size="footer" />
            <p className="max-w-sm text-sm leading-relaxed text-bone-dim">
              {t("description")}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <p className="eyebrow mb-4">{t("navTitle")}</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone-dim transition-colors hover:text-gold"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-4">{t("contactTitle")}</p>
            <ul className="flex flex-col gap-3 text-sm text-bone-dim">
              <li>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="transition-colors hover:text-gold"
                  dir="ltr"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.find((s) => s.icon === "instagram")?.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                  dir="ltr"
                >
                  {siteConfig.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <HiOutlineEnvelope className="text-gold/70" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappHref}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                  dir="ltr"
                >
                  WhatsApp: {siteConfig.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/${siteConfig.telegramHref}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                  dir="ltr"
                >
                  Telegram: {siteConfig.telegram}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-4">{t("socialTitle")}</p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = icons[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line/80 text-bone-dim transition-all duration-300 hover:border-gold/50 hover:bg-gold/5 hover:text-gold"
                  >
                    {Icon && <Icon className="text-base" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 hairline" />

        <div className="mt-8 flex flex-col gap-4 text-xs text-bone-faint md:flex-row md:items-center md:justify-between">
          <a
            href="https://dushanbe.inovaauto.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="order-1 transition-colors hover:text-gold md:order-none"
          >
            {t("developedBy")}
          </a>
          <p className="order-2 text-center md:order-none">
            © {year} {siteConfig.name}. {t("rights")}
          </p>
          <div className="order-3 flex flex-wrap items-center justify-center gap-5 md:order-none md:justify-end">
            {legalLinks.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="transition-colors hover:text-gold"
              >
                {t(`legal.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 start-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[100%] bg-gold/5 blur-3xl"
      />
    </footer>
  );
}

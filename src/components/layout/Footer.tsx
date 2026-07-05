import { useTranslations } from "next-intl";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaBehance,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Link } from "@/i18n/navigation";
import { navLinks, socialLinks, legalLinks, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const icons: Record<string, IconType> = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  pinterest: FaPinterestP,
  behance: FaBehance,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
};

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-800">
      <div className="container-luxe py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Logo />
            <p className="max-w-xs font-display text-2xl leading-tight text-bone-soft">
              {t("tagline")}
            </p>
            <div className="mt-2">
              <p className="eyebrow mb-3">{t("newsletterTitle")}</p>
              <p className="mb-4 max-w-xs text-sm text-bone-dim">
                {t("newsletterText")}
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <p className="eyebrow mb-6">{t("navTitle")}</p>
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
            <p className="eyebrow mb-6">{t("contactTitle")}</p>
            <ul className="flex flex-col gap-3 text-sm text-bone-dim">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="transition-colors hover:text-gold"
                  dir="ltr"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-6">{t("socialTitle")}</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = icons[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-bone-dim transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    {Icon && <Icon className="text-base" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Brand watermark */}
        <div
          aria-hidden
          className="mt-20 select-none overflow-hidden"
        >
          <p className="whitespace-nowrap text-center font-display text-[15vw] leading-[0.8] tracking-tight text-bone/[0.035] md:text-[11vw]">
            World of Wood
          </p>
        </div>

        <div className="my-14 hairline" />

        <div className="flex flex-col items-center justify-between gap-6 text-xs text-bone-faint md:flex-row">
          <p>
            © {year} {siteConfig.name}. {t("rights")}
          </p>
          <p className="order-first font-display text-[0.7rem] uppercase tracking-[0.3em] text-bone-dim md:order-none">
            {t("credit")} — Est. {siteConfig.founded}
          </p>
          <div className="flex items-center gap-6">
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

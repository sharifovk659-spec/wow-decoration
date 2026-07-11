"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlinePhone } from "react-icons/hi2";
import { siteConfig } from "@/lib/site";

const channels = [
  {
    key: "whatsapp",
    href: `https://wa.me/${siteConfig.whatsappHref}`,
    label: "WhatsApp",
    Icon: FaWhatsapp,
    ringClass: "animate-contact-ring",
    glowClass: "animate-contact-glow-wa",
  },
  {
    key: "phone",
    href: `tel:${siteConfig.phoneHref}`,
    label: siteConfig.phone,
    Icon: HiOutlinePhone,
    ringClass: "animate-contact-ring-reverse",
    glowClass: "animate-contact-glow-phone",
  },
] as const;

export function FloatingContact() {
  return (
    <div
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] end-[calc(1rem+env(safe-area-inset-right,0px))] z-[45] flex flex-col gap-3 sm:bottom-6 sm:end-6"
      aria-label="Быстрый контакт"
    >
      {channels.map(({ key, href, label, Icon, ringClass, glowClass }) => (
        <a
          key={key}
          href={href}
          target={key === "whatsapp" ? "_blank" : undefined}
          rel={key === "whatsapp" ? "noopener noreferrer" : undefined}
          aria-label={label}
          dir="ltr"
          className="group relative flex h-14 w-14 items-center justify-center sm:h-[3.75rem] sm:w-[3.75rem]"
        >
          {/* Rotating ring around icon */}
          <span
            className={`pointer-events-none absolute inset-0 rounded-full border border-dashed border-gold/55 ${ringClass}`}
            aria-hidden
          />

          {/* Icon button — inner shadow pulse stays inside */}
          <span
            className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-ink-800 text-lg text-gold transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 ${glowClass}`}
          >
            <Icon className="relative z-10" />
          </span>
        </a>
      ))}
    </div>
  );
}

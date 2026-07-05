"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { HiBars2, HiXMark, HiChevronDown } from "react-icons/hi2";
import { Link, usePathname } from "@/i18n/navigation";
import { projectCategories } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { easeLuxe } from "@/lib/motion";
import { useGSAP } from "@/hooks/useGSAP";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MegaMenu, type MegaKey } from "./MegaMenu";
import { ButtonLink } from "@/components/ui/Button";

type NavItem = { key: string; href: string; mega?: MegaKey };

const NAV: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services", mega: "services" },
  { key: "projects", href: "/projects", mega: "projects" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
];

const SERVICE_KEYS = ["0", "1", "2", "3", "4", "5"] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaKey | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 48));

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;
      gsap.from(".header-anim", {
        y: -22,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
      });
    },
    { scope: headerRef },
  );

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setActiveMega(null)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500",
          scrolled ? "py-3" : "py-5",
          scrolled || activeMega
            ? "glass border-x-0 border-t-0"
            : "border-b border-transparent",
        )}
      >
        <div className="container-luxe flex items-center justify-between gap-6">
          <div className="header-anim">
            <Logo />
          </div>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              const isMega = Boolean(item.mega);
              const megaActive = activeMega === item.mega;
              return (
                <div
                  key={item.key}
                  className="header-anim"
                  onMouseEnter={() => setActiveMega(item.mega ?? null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 rtl:tracking-[0.05em]",
                      active || megaActive
                        ? "text-gold"
                        : "text-bone-soft hover:text-bone",
                    )}
                  >
                    {t(item.key)}
                    {isMega && (
                      <HiChevronDown
                        className={cn(
                          "text-sm transition-transform duration-500",
                          megaActive && "rotate-180",
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-500 ease-out",
                        active || megaActive ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="header-anim hidden items-center gap-6 lg:flex">
            <LanguageSwitcher />
            <span className="h-4 w-px bg-line-strong" />
            <ButtonLink
              href="/contact"
              variant="outline"
              withArrow
              className="px-6 py-3 text-[0.7rem]"
            >
              {t("cta")}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="header-anim flex items-center gap-2 text-bone lg:hidden"
            aria-label={t("menu")}
          >
            <span className="text-[0.7rem] uppercase tracking-[0.2em]">
              {t("menu")}
            </span>
            <HiBars2 className="text-2xl" />
          </button>
        </div>

        <MegaMenu active={activeMega} onNavigate={() => setActiveMega(null)} />
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const tServices = useTranslations("services");
  const tProjects = useTranslations("projects");
  const [accordion, setAccordion] = useState<MegaKey | null>(null);

  const toggle = (key: MegaKey) =>
    setAccordion((cur) => (cur === key ? null : key));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: easeLuxe }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink-800 lg:hidden"
        >
          <div className="container-luxe flex items-center justify-between py-5">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-bone"
              aria-label={t("close")}
            >
              <span className="text-[0.7rem] uppercase tracking-[0.2em]">
                {t("close")}
              </span>
              <HiXMark className="text-2xl" />
            </button>
          </div>

          <nav className="container-luxe flex flex-1 flex-col justify-center gap-1 py-8">
            {NAV.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.07,
                  duration: 0.7,
                  ease: easeLuxe,
                }}
                className="border-b border-line"
              >
                {item.mega ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggle(item.mega!)}
                      className="flex w-full items-center justify-between py-5 text-start"
                    >
                      <span className="font-display text-4xl text-bone">
                        {t(item.key)}
                      </span>
                      <HiChevronDown
                        className={cn(
                          "text-2xl text-gold transition-transform duration-500",
                          accordion === item.mega && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {accordion === item.mega && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: easeLuxe }}
                          className="overflow-hidden"
                        >
                          {item.mega === "services"
                            ? SERVICE_KEYS.map((k) => (
                                <li key={k}>
                                  <Link
                                    href="/services"
                                    onClick={onClose}
                                    className="block py-2.5 ps-1 text-lg text-bone-dim transition-colors hover:text-gold"
                                  >
                                    {tServices(`items.${k}.title`)}
                                  </Link>
                                </li>
                              ))
                            : projectCategories.map((c) => (
                                <li key={c}>
                                  <Link
                                    href="/projects"
                                    onClick={onClose}
                                    className="block py-2.5 ps-1 text-lg text-bone-dim transition-colors hover:text-gold"
                                  >
                                    {tProjects(`filters.${c}`)}
                                  </Link>
                                </li>
                              ))}
                          <li className="pb-4" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-5 font-display text-4xl text-bone transition-colors hover:text-gold"
                  >
                    {t(item.key)}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="container-luxe flex items-center justify-between py-8"
          >
            <LanguageSwitcher />
            <ButtonLink
              href="/contact"
              variant="primary"
              withArrow
              magnetic={false}
              onClick={onClose}
            >
              {t("cta")}
            </ButtonLink>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

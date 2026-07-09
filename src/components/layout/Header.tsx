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
import { HiBars2, HiXMark } from "react-icons/hi2";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { easeLuxe } from "@/lib/motion";
import { useGSAP } from "@/hooks/useGSAP";
import { useLenis } from "@/components/layout/SmoothScroll";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ButtonLink } from "@/components/ui/Button";

type NavItem = { key: string; href: string };

const NAV: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "production", href: "/#production" },
  { key: "materials", href: "/#materials" },
  { key: "projects", href: "/projects" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
];

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const base = href.split("#")[0];
  if (!base || base === "/") return false;
  return pathname === base || pathname.startsWith(`${base}/`);
}

function scrollToHash(hash: string, lenis: ReturnType<typeof useLenis>) {
  const el = document.querySelector(hash);
  if (!(el instanceof HTMLElement)) return;
  if (lenis?.current) {
    lenis.current.scrollTo(el, { offset: -96, duration: 1.2 });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const lenis = useLenis();
  const headerRef = useRef<HTMLElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const hash = href.slice(hashIndex);
    const base = href.slice(0, hashIndex) || "/";

    if (pathname === "/" && base === "/") {
      e.preventDefault();
      scrollToHash(hash, lenis);
      setOpen(false);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,backdrop-filter,border-color,padding,box-shadow] duration-500",
          scrolled ? "py-3" : "py-4",
          scrolled
            ? "glass border-x-0 border-t-0 shadow-[0_1px_0_0_rgba(192,160,104,0.28)]"
            : "border-b border-line/20 bg-ink/55 backdrop-blur-md",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />

        <div className="container-luxe flex items-center justify-between gap-4 xl:gap-6">
          <div className="header-anim shrink-0">
            <Logo />
          </div>

          <nav className="hidden items-center gap-2 xl:flex 2xl:gap-4">
            {NAV.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <div key={item.key} className="header-anim">
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "group relative max-w-[8.5rem] truncate px-0.5 py-2 text-[0.625rem] font-medium uppercase tracking-[0.1em] transition-colors duration-300 2xl:max-w-none 2xl:text-[0.68rem] 2xl:tracking-[0.14em]",
                      active
                        ? "text-gold"
                        : "text-bone-soft hover:text-bone",
                    )}
                    title={t(item.key)}
                  >
                    {t(item.key)}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-gold/20 via-gold to-gold/20 transition-all duration-500 ease-out",
                        active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                      )}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="header-anim hidden shrink-0 items-center gap-4 xl:flex">
            <LanguageSwitcher />
            <ButtonLink
              href="/contact"
              variant="outline"
              withArrow
              className="border-gold/35 px-5 py-3 text-[0.68rem] tracking-[0.14em] hover:border-gold/60 hover:shadow-gold 2xl:px-6 2xl:text-[0.7rem]"
            >
              {t("cta")}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="header-anim flex items-center gap-2 text-bone transition-colors hover:text-gold xl:hidden"
            aria-label={t("menu")}
          >
            <span className="text-[0.7rem] uppercase tracking-[0.2em]">
              {t("menu")}
            </span>
            <HiBars2 className="text-2xl" />
          </button>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  onNavClick,
}: {
  open: boolean;
  onClose: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: easeLuxe }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink-800/98 backdrop-blur-xl xl:hidden"
        >
          <div className="container-luxe flex items-center justify-between border-b border-line py-5">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-bone transition-colors hover:text-gold"
              aria-label={t("close")}
            >
              <span className="text-[0.7rem] uppercase tracking-[0.2em]">
                {t("close")}
              </span>
              <HiXMark className="text-2xl" />
            </button>
          </div>

          <nav className="container-luxe flex flex-1 flex-col justify-center gap-0 py-8">
            {NAV.map((item, i) => {
              const active = isNavActive(pathname, item.href);
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.05,
                    duration: 0.7,
                    ease: easeLuxe,
                  }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      onNavClick(e, item.href);
                      onClose();
                    }}
                    className={cn(
                      "block py-5 font-display text-3xl transition-colors sm:text-4xl",
                      active
                        ? "text-gold"
                        : "text-bone hover:text-gold-soft",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="container-luxe border-t border-line py-8"
          >
            <LanguageSwitcher variant="compact" className="mb-8 justify-center" />
            <ButtonLink
              href="/contact"
              variant="primary"
              withArrow
              magnetic={false}
              onClick={onClose}
              className="w-full justify-center sm:w-auto"
            >
              {t("cta")}
            </ButtonLink>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

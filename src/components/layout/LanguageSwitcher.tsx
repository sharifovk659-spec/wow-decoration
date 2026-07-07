"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeConfig, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { easeLuxe } from "@/lib/motion";

export function LanguageSwitcher({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "compact";
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);

  const current = localeConfig[locale];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative", isPending && "opacity-60", className)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("language")}
        className={cn(
          "flex items-center gap-2 rounded-full border border-line/70 bg-ink/40 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-bone-soft backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:text-gold",
          open && "border-gold/45 bg-ink-800/90 text-gold",
          variant === "compact" && "px-2.5 py-1.5",
        )}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="hidden sm:inline">{current.short}</span>
        <HiChevronDown
          className={cn(
            "text-sm transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t("language")}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: easeLuxe }}
            className={cn(
              "absolute end-0 top-[calc(100%+0.5rem)] z-[80] min-w-[11rem] overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-800/98 p-1.5 shadow-luxe backdrop-blur-xl",
              variant === "compact" && "start-0 end-auto min-w-[10rem]",
            )}
          >
            {locales.map((l) => {
              const cfg = localeConfig[l];
              const active = l === locale;
              return (
                <li key={l} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => switchTo(l)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-start text-sm transition-colors duration-200",
                      active
                        ? "bg-gold/10 text-gold"
                        : "text-bone-dim hover:bg-bone/5 hover:text-bone",
                    )}
                  >
                    <span className="text-lg leading-none" aria-hidden>
                      {cfg.flag}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-medium">{cfg.label}</span>
                      <span className="text-[0.65rem] uppercase tracking-[0.14em] text-bone-faint">
                        {cfg.short}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

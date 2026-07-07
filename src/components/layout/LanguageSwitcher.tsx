"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeConfig, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

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
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        variant === "compact" ? "gap-2" : "gap-1",
        isPending && "opacity-50",
        className,
      )}
      role="group"
      aria-label={t("language")}
    >
      {locales.map((l, i) => {
        const cfg = localeConfig[l];
        const active = l === locale;
        return (
          <span key={l} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => switchTo(l)}
              aria-pressed={active}
              aria-label={cfg.label}
              title={cfg.label}
              className={cn(
                "group relative flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] transition-all duration-300",
                active
                  ? "border-gold/45 bg-gold/10 text-gold"
                  : "border-transparent text-bone-dim hover:border-line hover:text-bone",
                variant === "compact" && "px-2 py-1",
              )}
            >
              <span className="text-sm leading-none" aria-hidden>
                {cfg.flag}
              </span>
              {variant === "default" && (
                <span className="hidden 2xl:inline">{cfg.short}</span>
              )}
            </button>
            {i < locales.length - 1 && variant === "default" && (
              <span className="hidden text-bone-faint 2xl:inline">·</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

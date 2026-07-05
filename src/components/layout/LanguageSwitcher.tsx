"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeShort, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
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
        "flex items-center gap-1.5 text-xs font-medium tracking-[0.15em]",
        isPending && "opacity-50",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={l === locale}
            className={cn(
              "relative py-1 transition-colors duration-300 hover:text-gold",
              l === locale ? "text-gold" : "text-bone-dim",
            )}
          >
            {localeShort[l]}
            {l === locale && (
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-gold/70" />
            )}
          </button>
          {i < locales.length - 1 && (
            <span className="text-bone-faint">·</span>
          )}
        </span>
      ))}
    </div>
  );
}

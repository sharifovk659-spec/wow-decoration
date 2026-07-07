"use client";

import { useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { useLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

/**
 * Mobile scroll affordance — bottom-right.
 * Down animation while browsing; flips to up near page bottom.
 */
export function ScrollEdgeHint() {
  const t = useTranslations("hero");
  const lenisRef = useLenis();
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      const doc = document.documentElement;
      setAtBottom(
        window.scrollY + window.innerHeight >= doc.scrollHeight - 96,
      );
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    const lenis = lenisRef?.current;
    lenis?.on("scroll", check);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      lenis?.off("scroll", check);
    };
  }, [lenisRef]);

  const onClick = () => {
    const lenis = lenisRef?.current;
    if (atBottom) {
      if (lenis) lenis.scrollTo(0, { duration: 1.15 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = window.scrollY + window.innerHeight * 0.82;
    if (lenis) lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={atBottom ? t("scrollUp") : t("scroll")}
      className={cn(
        "hero-hint fixed bottom-5 end-4 z-40 flex flex-col items-center gap-2",
        "rounded-full border border-line/70 bg-ink/45 px-2.5 py-3 backdrop-blur-md",
        "transition-colors duration-300 hover:border-gold/40 active:scale-95 md:hidden",
      )}
    >
      <span className="relative h-9 w-px overflow-hidden bg-line-strong">
        <span
          className={cn(
            "absolute inset-x-0 h-full w-full bg-gold",
            atBottom
              ? "[animation:scroll-hint-up_2s_ease-in-out_infinite]"
              : "[animation:scroll-hint_2s_ease-in-out_infinite]",
          )}
        />
      </span>
      {atBottom ? (
        <HiChevronUp className="text-lg text-gold" aria-hidden />
      ) : (
        <HiChevronDown className="text-lg text-gold" aria-hidden />
      )}
    </button>
  );
}

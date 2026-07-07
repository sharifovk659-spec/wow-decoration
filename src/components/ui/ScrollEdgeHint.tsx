"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

/**
 * Mobile scroll control — circular button, bottom-right.
 * Arrow stem fills with scroll progress; flips ↑ at page bottom.
 */
export function ScrollEdgeHint() {
  const t = useTranslations("hero");
  const lenisRef = useLenis();
  const [progress, setProgress] = useState(0);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const y = window.scrollY;
      setProgress(Math.min(1, Math.max(0, y / max)));
      setAtBottom(y + window.innerHeight >= doc.scrollHeight - 56);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const lenis = lenisRef?.current;
    lenis?.on("scroll", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      lenis?.off("scroll", update);
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

  const stemY1 = 15;
  const stemY2 = 27;
  const stemLen = stemY2 - stemY1;
  const fillStart = stemY1;
  const fillEnd = atBottom
    ? stemY2
    : stemY1 + stemLen * Math.max(progress, 0.12);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={atBottom ? t("scrollUp") : t("scroll")}
      className={cn(
        "hero-hint fixed bottom-6 end-4 z-40 flex h-12 w-12 items-center justify-center",
        "rounded-full border border-bone/20 bg-ink/55 shadow-luxe backdrop-blur-md",
        "transition-transform duration-300 active:scale-95 md:hidden",
      )}
    >
      <svg
        viewBox="0 0 48 48"
        className="h-7 w-7"
        aria-hidden
        style={{
          transform: atBottom ? "rotate(0deg)" : "rotate(180deg)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Arrow stem — track */}
        <line
          x1="24"
          y1={stemY1}
          x2="24"
          y2={stemY2}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-bone/25"
        />
        {/* Arrow stem — scroll fill */}
        <line
          x1="24"
          y1={fillStart}
          x2="24"
          y2={fillEnd}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-bone"
        />
        {/* Chevron */}
        <polyline
          points="18,21 24,15 30,21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-bone"
        />
      </svg>
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

const STEM = 11;

/**
 * Mobile scroll orb (bottom-right) — matches reference:
 * circular control, arrow stem fills with scroll progress, flips ↑ at page end.
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
      setAtBottom(y + window.innerHeight >= doc.scrollHeight - 96);
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

  const fill = atBottom ? STEM : STEM * progress;
  const active = progress > 0.04 || atBottom;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={atBottom ? t("scrollUp") : t("scroll")}
      className={cn(
        "scroll-edge-hint fixed bottom-6 end-5 z-50",
        "flex h-12 w-12 items-center justify-center rounded-full",
        "border border-line-strong bg-ink/85 shadow-luxe backdrop-blur-md",
        "transition-[transform,border-color,box-shadow] duration-300",
        "hover:border-gold/40 hover:shadow-gold active:scale-95 md:hidden",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={cn(
          "h-[1.375rem] w-[1.375rem] transition-transform duration-500 ease-out",
          atBottom && "rotate-180",
        )}
      >
        {/* stem track */}
        <line
          x1="12"
          y1="5.5"
          x2="12"
          y2="16.5"
          stroke="currentColor"
          className="text-bone-faint/30"
          strokeWidth="1.85"
          strokeLinecap="round"
        />
        {/* stem fill — grows with scroll depth */}
        <line
          x1="12"
          y1="5.5"
          x2="12"
          y2="16.5"
          stroke="currentColor"
          className="text-gold transition-[stroke-dashoffset] duration-150 ease-out"
          strokeWidth="1.85"
          strokeLinecap="round"
          pathLength={STEM}
          strokeDasharray={STEM}
          strokeDashoffset={STEM - fill}
        />
        {/* arrowhead */}
        <path
          d="M8.5 13.5 L12 17 L15.5 13.5"
          stroke="currentColor"
          className={cn(
            "transition-colors duration-300",
            active ? "text-gold" : "text-bone-faint/45",
          )}
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

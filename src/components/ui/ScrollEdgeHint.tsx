"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

const STEM = 11;
const RING_R = 20.5;
const RING_C = 2 * Math.PI * RING_R;

/**
 * Mobile scroll orb — bottom-right.
 * Arrow follows scroll direction; ring + stem fill track page progress.
 * Tap always scrolls smoothly to top.
 */
export function ScrollEdgeHint() {
  const t = useTranslations("hero");
  const lenisRef = useLenis();
  const lastY = useRef(0);
  const [progress, setProgress] = useState(0);
  const [pointUp, setPointUp] = useState(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / max));

      setProgress(p);

      const atTop = y <= 12;
      const atBottom = y + window.innerHeight >= doc.scrollHeight - 96;

      if (atTop) {
        setPointUp(false);
      } else if (atBottom) {
        setPointUp(true);
      } else {
        const delta = y - lastY.current;
        if (Math.abs(delta) > 1) {
          setPointUp(delta < 0);
        }
      }

      lastY.current = y;
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
    if (lenis) lenis.scrollTo(0, { duration: 1.15 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fill = STEM * progress;
  const active = progress > 0.04;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={pointUp ? t("scrollUp") : t("scroll")}
      className={cn(
        "scroll-edge-hint fixed bottom-[30px] end-[30px] z-50 max-md:mb-[env(safe-area-inset-bottom,0px)]",
        "flex h-12 w-12 items-center justify-center rounded-full",
        "border border-line-strong/60 bg-ink/85 shadow-luxe backdrop-blur-md",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-gold/40 hover:shadow-gold active:scale-95 md:hidden",
      )}
    >
      {/* circular progress ring */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r={RING_R}
          stroke="currentColor"
          className="text-bone-faint/20"
          strokeWidth="1.25"
        />
        <circle
          cx="24"
          cy="24"
          r={RING_R}
          stroke="currentColor"
          className="text-gold transition-[stroke-dashoffset] duration-150 ease-out"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray={RING_C}
          strokeDashoffset={RING_C * (1 - progress)}
        />
      </svg>

      {/* arrow */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={cn(
          "relative z-[1] h-[1.375rem] w-[1.375rem] transition-transform duration-300 ease-out",
          pointUp && "rotate-180",
        )}
      >
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
        <path
          d="M8.5 13.5 L12 17 L15.5 13.5"
          stroke="currentColor"
          className={cn(
            "transition-colors duration-300",
            active || pointUp ? "text-gold" : "text-bone-faint/45",
          )}
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

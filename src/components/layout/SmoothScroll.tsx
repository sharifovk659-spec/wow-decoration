"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollTriggerRefresh } from "@/hooks/useScrollTriggerRefresh";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/** Access the active Lenis instance (via a stable ref) for programmatic scroll. */
export const useLenis = () => useContext(LenisContext);

/**
 * Global smooth-scroll provider. Drives Lenis from the GSAP ticker so
 * Framer Motion scroll effects and GSAP ScrollTrigger share one loop.
 * Automatically disabled for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useScrollTriggerRefresh();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });
    lenisRef.current = instance;

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);
    ScrollTrigger.refresh();

    const handler = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(handler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(handler);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}

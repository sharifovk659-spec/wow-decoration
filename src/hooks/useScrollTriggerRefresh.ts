"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Keeps GSAP ScrollTrigger in sync with Lenis, mobile viewport changes,
 * and late-loading media so animated sections do not stay invisible.
 */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    refresh();

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);

    const t1 = window.setTimeout(refresh, 400);
    const t2 = window.setTimeout(refresh, 1200);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);
}

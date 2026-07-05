"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";

interface Options {
  scope?: RefObject<HTMLElement | null>;
  dependencies?: unknown[];
}

/**
 * Minimal GSAP context hook: runs the callback inside a scoped
 * `gsap.context` and reverts all animations / ScrollTriggers on cleanup.
 */
export function useGSAP(callback: () => void, options: Options = {}) {
  const { scope, dependencies = [] } = options;

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback();
    }, scope?.current ?? undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

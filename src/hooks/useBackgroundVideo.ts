"use client";

import { useEffect } from "react";

type Options = {
  /** When false, video stays paused (e.g. reduced motion). */
  enabled?: boolean;
  /** Load when section enters viewport (saves mobile bandwidth). */
  lazy?: boolean;
};

/**
 * Reliable muted background video on desktop and mobile:
 * playsInline, retries play() after canplay, optional lazy load.
 */
export function useBackgroundVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  { enabled = true, lazy = false }: Options = {},
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      return;
    }

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => undefined);
      }
    };

    const onCanPlay = () => tryPlay();
    video.addEventListener("canplay", onCanPlay);

    const unlock = () => tryPlay();
    document.addEventListener("touchstart", unlock, { once: true, passive: true });

    if (!lazy) {
      video.preload = "auto";
      tryPlay();
    }

    let io: IntersectionObserver | undefined;
    if (lazy) {
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting;
          if (visible) {
            if (video.preload === "none") {
              video.preload = "auto";
              video.load();
            }
            tryPlay();
          } else {
            video.pause();
          }
        },
        { rootMargin: "120px", threshold: 0.08 },
      );
      io.observe(video);
    }

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("touchstart", unlock);
      io?.disconnect();
    };
  }, [videoRef, enabled, lazy]);
}

"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  HiXMark,
  HiArrowLongLeft,
  HiArrowLongRight,
  HiArrowsPointingOut,
  HiArrowsPointingIn,
} from "react-icons/hi2";
import { useLenis } from "@/components/layout/SmoothScroll";
import { easeLuxe } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Client-only flag without setState-in-effect (portal-safe hydration). */
const emptySubscribe = () => () => {};

interface LightboxProps {
  images: string[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  alt: (index: number) => string;
  labels: {
    close: string;
    previous: string;
    next: string;
    fullscreen: string;
  };
}

/**
 * Fullscreen, keyboard- and swipe-navigable gallery. Renders through a
 * portal, locks Lenis + body scroll while open, and restores focus flow
 * on close. Reduced-motion users get instant transitions.
 */
export function Lightbox({
  images,
  index,
  open,
  onClose,
  onIndexChange,
  alt,
  labels,
}: LightboxProps) {
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const reduceMotion = useReducedMotion();
  const lenisRef = useLenis();
  const rootRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Keep the fullscreen button in sync with the Fullscreen API.
  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      rootRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      onIndexChange((index + dir + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Lock scroll while the gallery is open.
  useEffect(() => {
    if (!open) return;
    const lenis = lenisRef?.current;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
  }, [open, lenisRef]);

  // Keyboard navigation.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) go(1);
    else if (info.offset.x > threshold) go(-1);
  };

  const slide = {
    enter: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d > 0 ? 64 : -64,
      scale: 0.98,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d > 0 ? -64 : 64,
      scale: 0.98,
    }),
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={rootRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeLuxe }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/92 backdrop-blur-xl"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-5 md:px-8">
            <span className="font-display text-lg text-bone-soft">
              <span className="text-gold">{String(index + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-bone-faint">/</span>
              {String(count).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={labels.fullscreen}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="hidden h-12 w-12 items-center justify-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-gold hover:text-gold sm:flex"
              >
                {isFullscreen ? (
                  <HiArrowsPointingIn className="text-xl" />
                ) : (
                  <HiArrowsPointingOut className="text-xl" />
                )}
              </button>
              <button
                type="button"
                aria-label={labels.close}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <HiXMark className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div className="relative flex flex-1 items-center justify-center px-4 md:px-20">
            {count > 1 && (
              <button
                type="button"
                aria-label={labels.previous}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute start-3 z-10 hidden h-14 w-14 items-center justify-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-gold hover:text-gold md:flex"
              >
                <HiArrowLongLeft className="text-2xl rtl:rotate-180" />
              </button>
            )}

            <div
              className="relative h-[62vh] w-full max-w-6xl md:h-[74vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence custom={direction} mode="wait" initial={false}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: easeLuxe }}
                  drag={count > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={onDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={images[index]!}
                    alt={alt(index)}
                    fill
                    sizes="90vw"
                    quality={90}
                    priority
                    draggable={false}
                    className="select-none object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {count > 1 && (
              <button
                type="button"
                aria-label={labels.next}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute end-3 z-10 hidden h-14 w-14 items-center justify-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-gold hover:text-gold md:flex"
              >
                <HiArrowLongRight className="text-2xl rtl:rotate-180" />
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {count > 1 && (
            <div
              className="flex items-center justify-center gap-3 px-5 py-6"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    onIndexChange(i);
                  }}
                  className={cn(
                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-md ring-1 transition-all duration-300",
                    i === index
                      ? "opacity-100 ring-gold"
                      : "opacity-45 ring-transparent hover:opacity-80",
                  )}
                >
                  <Image
                    src={src}
                    alt={alt(i)}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

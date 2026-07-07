"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { useLenis } from "@/components/layout/SmoothScroll";
import { easeLuxe } from "@/lib/motion";

/** Client-only flag without setState-in-effect (portal-safe hydration). */
const emptySubscribe = () => () => {};

interface VideoModalProps {
  src: string | null;
  fallbackSrc?: string;
  poster?: string;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  caption?: string;
}

/**
 * Cinematic video player rendered through a portal. Locks Lenis + body
 * scroll while open, closes on Escape or backdrop click, and autoplays the
 * film once mounted.
 */
export function VideoModal({
  src,
  fallbackSrc,
  poster,
  open,
  onClose,
  closeLabel,
  caption,
}: VideoModalProps) {
  const lenisRef = useLenis();
  const videoRef = useRef<HTMLVideoElement>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Lock scroll while open.
  useEffect(() => {
    if (!open) return;
    const lenis = lenisRef?.current;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [open, lenisRef]);

  // Escape to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Best-effort autoplay once the film is shown.
  useEffect(() => {
    if (!open || !src) return;
    videoRef.current?.play().catch(() => {});
  }, [open, src]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && src && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={caption ?? closeLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeLuxe }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/92 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-5 py-5 md:px-8">
            <span className="eyebrow text-bone-dim">{caption}</span>
            <button
              type="button"
              aria-label={closeLabel}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <HiXMark className="text-2xl" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-10 md:px-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: easeLuxe }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl overflow-hidden rounded-luxe-lg shadow-luxe-lg"
            >
              <video
                ref={videoRef}
                poster={poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-ink"
              >
                <source src={src} type="video/mp4" />
                {fallbackSrc && (
                  <source src={fallbackSrc} type="video/mp4" />
                )}
              </video>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

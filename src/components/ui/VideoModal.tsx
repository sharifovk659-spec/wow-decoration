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
  src?: string | null;
  youtubeId?: string | null;
  poster?: string;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  caption?: string;
}

/**
 * Cinematic player rendered through a portal. Supports local MP4 or YouTube
 * Shorts embed. Locks Lenis + body scroll while open.
 */
export function VideoModal({
  src,
  youtubeId,
  poster,
  open,
  onClose,
  closeLabel,
  caption,
}: VideoModalProps) {
  const lenisRef = useLenis();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isYoutube = Boolean(youtubeId);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !src || isYoutube) return;
    videoRef.current?.play().catch(() => {});
  }, [open, src, isYoutube]);

  if (!mounted) return null;

  const hasMedia = isYoutube ? Boolean(youtubeId) : Boolean(src);

  return createPortal(
    <AnimatePresence>
      {open && hasMedia && (
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
              className={
                isYoutube
                  ? "aspect-[9/16] w-full max-w-[min(100%,22rem)] overflow-hidden rounded-luxe-lg shadow-luxe-lg sm:max-w-sm"
                  : "w-full max-w-5xl overflow-hidden rounded-luxe-lg shadow-luxe-lg"
              }
            >
              {isYoutube && youtubeId ? (
                <iframe
                  key={youtubeId}
                  title={caption ?? "YouTube video"}
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0 bg-ink"
                />
              ) : (
                <video
                  ref={videoRef}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="aspect-video max-h-[72dvh] w-full bg-ink object-contain sm:max-h-none"
                >
                  <source src={src!} type="video/mp4" />
                </video>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

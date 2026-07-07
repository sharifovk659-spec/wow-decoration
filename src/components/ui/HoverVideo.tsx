"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverVideoProps {
  src: string;
  alt: string;
  video?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Poster image that reveals a silent, looping clip on hover (desktop)
 * or tap / in-view autoplay (touch). Disabled for reduced-motion users.
 */
export function HoverVideo({
  src,
  alt,
  video,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: HoverVideoProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    touchRef.current = !window.matchMedia("(pointer: fine)").matches;
  }, []);

  const canPlay = Boolean(video) && !reduceMotion;

  const start = () => {
    if (!canPlay) return;
    const el = videoRef.current;
    if (!el) return;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const stop = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setPlaying(false);
  };

  const onTouchToggle = () => {
    if (!touchRef.current) return;
    if (playing) stop();
    else start();
  };

  useEffect(() => {
    if (!canPlay || !touchRef.current) return;
    const root = rootRef.current;
    const el = videoRef.current;
    if (!root || !el) return;

    const play = () => {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };
    const pause = () => {
      el.pause();
      setPlaying(false);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) play();
        else pause();
      },
      { threshold: 0.35, rootMargin: "40px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [canPlay, video]);

  return (
    <div
      ref={rootRef}
      className={cn("relative overflow-hidden", className)}
      onPointerEnter={start}
      onPointerLeave={stop}
      onClick={onTouchToggle}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />

      {canPlay && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onCanPlay={() => setReady(true)}
          onLoadedData={() => setReady(true)}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            playing && ready ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}

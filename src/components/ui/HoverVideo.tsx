"use client";

import { useRef, useState } from "react";
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
 * Poster image that reveals a silent, looping clip on hover. The image
 * remains the LCP-friendly default; the video only loads on first hover
 * and is disabled entirely for reduced-motion users.
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
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

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

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onPointerEnter={start}
      onPointerLeave={stop}
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
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onCanPlay={() => setReady(true)}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            playing && ready ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number;
}

/**
 * Infinite CSS marquee. Content is duplicated for a seamless loop and
 * pauses on hover.
 */
export function Marquee({
  items,
  className,
  reverse = false,
  speed = 40,
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="flex shrink-0 items-center gap-luxe pe-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-luxe whitespace-nowrap font-display text-4xl text-bone-dim md:text-6xl"
          >
            {item}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

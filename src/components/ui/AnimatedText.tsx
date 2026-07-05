"use client";

import { createElement, type ElementType } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { easeLuxe } from "@/lib/motion";

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Word-by-word mask reveal for editorial headings. Each word rises from
 * behind a clipping mask with a staggered cadence.
 */
export function AnimatedText({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.07,
  once = true,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: 1, ease: easeLuxe } },
  };

  if (reduceMotion) {
    return createElement(as, { className }, text);
  }

  return createElement(
    as,
    { className },
    <motion.span
      className="inline"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="clip-text me-[0.25em] last:me-0"
        >
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>,
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./AnimatedText";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-6",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-gold/60" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>
      )}

      <AnimatedText
        text={title}
        as="h2"
        className={cn("text-h2 text-bone", titleClassName)}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-lead max-w-xl text-bone-dim"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

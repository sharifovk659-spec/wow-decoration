"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { easeLuxe } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "container-luxe pb-[30px] pt-36 md:pt-48",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6 flex items-center gap-4"
      >
        <span className="h-px w-12 bg-gold/70" />
        <span className="eyebrow">{eyebrow}</span>
      </motion.div>

      <AnimatedText
        text={title}
        as="h1"
        className="text-h1 max-w-5xl text-bone"
        once={false}
        delay={0.1}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: easeLuxe }}
          className="text-lead mt-8 max-w-2xl text-bone-dim"
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}

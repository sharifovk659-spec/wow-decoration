import type { Variants, Transition } from "framer-motion";

export const easeLuxe = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.6,
};

/** Fade + rise, used across sections for content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeLuxe },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: easeLuxe } },
};

/** Container that staggers its children. */
export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Word / line mask reveal for editorial headings. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1, ease: easeLuxe },
  },
};

export const imageReveal: Variants = {
  hidden: { scale: 1.25 },
  visible: { scale: 1, transition: { duration: 1.4, ease: easeLuxe } },
};

export const viewportOnce = { once: true, amount: 0.3 } as const;

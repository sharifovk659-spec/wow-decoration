"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/**
 * Bespoke trailing cursor for pointer devices. A small brass dot follows
 * exactly while an outlined ring eases behind it, expanding over
 * interactive elements. Hidden on touch devices.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const syncEnabled = () => setEnabled(mq.matches);
    syncEnabled();
    mq.addEventListener("change", syncEnabled);

    if (!mq.matches) {
      return () => mq.removeEventListener("change", syncEnabled);
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement;
      setHovering(
        Boolean(
          target.closest(
            "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
          ),
        ),
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.body.addEventListener("mouseleave", leave);
    return () => {
      mq.removeEventListener("change", syncEnabled);
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {!hidden && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold lg:block"
            style={{ x, y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: hovering ? 0 : 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 lg:block"
            style={{ x: ringX, y: ringY }}
            initial={{ opacity: 0, width: 32, height: 32 }}
            animate={{
              opacity: 1,
              width: hovering ? 64 : 32,
              height: hovering ? 64 : 32,
              borderColor: hovering
                ? "rgba(184,150,90,0.9)"
                : "rgba(184,150,90,0.45)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

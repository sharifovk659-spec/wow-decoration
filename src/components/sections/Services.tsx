"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { easeLuxe } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { siteImage } from "@/lib/media";

const SERVICE_IMAGES = [
  siteImage("projects/private-villa-interior.jpg"),
  siteImage("gallery/gazebo-royal.jpg"),
  siteImage("projects/parliament-tajikistan.jpg"),
  siteImage("gallery/furniture.jpg"),
  siteImage("gallery/islamic.jpg"),
  siteImage("projects/expo-dubai.jpg"),
];

const keys = ["0", "1", "2", "3", "4", "5"] as const;

export function Services({ withHeading = true }: { withHeading?: boolean }) {
  const t = useTranslations("services");
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section className="relative border-t border-line bg-ink-800 py-20 md:py-32">
      <div className="container-luxe">
        {withHeading && (
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-16 md:mb-20"
          />
        )}

        <div
          ref={containerRef}
          onMouseMove={handleMove}
          className="relative"
          onMouseLeave={() => setActive(null)}
        >
          {/* Floating preview (desktop) */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                aria-hidden
                className="pointer-events-none absolute z-20 hidden aspect-[4/3] w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-luxe-lg shadow-luxe-lg lg:block"
                style={{ left: x, top: y }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: easeLuxe }}
              >
                <Image
                  src={SERVICE_IMAGES[active]!}
                  alt=""
                  fill
                  sizes="288px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/20" />
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="border-t border-line">
            {keys.map((key, i) => (
              <li key={key}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: easeLuxe, delay: i * 0.05 }}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "group grid grid-cols-1 items-baseline gap-4 border-b border-line py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10",
                  )}
                >
                  <span className="font-display text-sm text-gold md:col-span-1">
                    {t(`items.${key}.index`)}
                  </span>
                  <h3 className="text-h3 text-bone transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 md:col-span-5">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-bone-dim md:text-base md:col-span-6">
                    {t(`items.${key}.text`)}
                  </p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

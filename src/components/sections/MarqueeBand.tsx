"use client";

import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/Marquee";

export function MarqueeBand() {
  const t = useTranslations("marquee");
  const items = t.raw("items") as string[];

  return (
    <div className="border-y border-line py-8 md:py-10">
      <Marquee items={items} speed={45} />
    </div>
  );
}

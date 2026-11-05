"use client";

import { useEffect, useState } from "react";
import type { CmsManifest } from "@/lib/cms/types";

type PublicMedia = Pick<
  CmsManifest,
  | "productionSteps"
  | "gallery"
  | "hero"
  | "processVideo"
  | "projectCovers"
  | "videoTestimonials"
  | "updatedAt"
>;

let cache: PublicMedia | null = null;
let inflight: Promise<PublicMedia | null> | null = null;

async function fetchPublicMedia(force = false): Promise<PublicMedia | null> {
  if (!force && cache) return cache;
  if (force) cache = null;
  if (!inflight) {
    inflight = fetch("/api/cms/media", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as PublicMedia;
        cache = data;
        return data;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function useCmsMedia() {
  const [media, setMedia] = useState<PublicMedia | null>(cache);

  useEffect(() => {
    let alive = true;
    // Always re-fetch on mount so admin creates/edits appear after "На сайт".
    void fetchPublicMedia(true).then((data) => {
      if (alive) setMedia(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  return media;
}

export function invalidateCmsMediaCache() {
  cache = null;
  inflight = null;
}

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

async function fetchPublicMedia(): Promise<PublicMedia | null> {
  if (cache) return cache;
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
    void fetchPublicMedia().then((data) => {
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
}

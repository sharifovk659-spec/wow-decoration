import type { GalleryItem } from "@/lib/gallery";

export interface CmsHero {
  poster: string | null;
  video: string | null;
}

export interface CmsProcessVideo {
  mp4: string | null;
  poster: string | null;
}

export interface CmsVideoTestimonial {
  id: string;
  poster: string;
  /** YouTube video / Shorts ID (optional if `src` or Instagram is set). */
  youtubeId: string;
  /** Instagram reel / post shortcode (optional if `src` or YouTube is set). */
  instagramId?: string | null;
  /** Instagram embed path: reel (default) or p. */
  instagramKind?: "reel" | "p" | null;
  duration: string;
  /** Uploaded file URL (mp4/webm/mov/…) — plays on site when set. */
  src?: string | null;
}

export interface CmsManifest {
  version: number;
  updatedAt: string | null;
  /** Overrides keyed by step index "0"…"7" */
  productionSteps: Record<string, string>;
  /** null = use built-in galleryItems */
  gallery: GalleryItem[] | null;
  hero: CmsHero;
  processVideo: CmsProcessVideo;
  /** Overrides keyed by project slug */
  projectCovers: Record<string, string>;
  /** null = use built-in videoTestimonials */
  videoTestimonials: CmsVideoTestimonial[] | null;
}

export const EMPTY_MANIFEST: CmsManifest = {
  version: 1,
  updatedAt: null,
  productionSteps: {},
  gallery: null,
  hero: { poster: null, video: null },
  processVideo: { mp4: null, poster: null },
  projectCovers: {},
  videoTestimonials: null,
};

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
  youtubeId: string;
  duration: string;
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

export type GalleryCategory = "interiors" | "furniture" | "sacred" | "craft";

export interface GalleryItem {
  /** Unsplash photo id — also used as a stable React key. */
  id: string;
  category: GalleryCategory;
  /** Intrinsic aspect [width, height], drives the masonry rhythm. */
  ratio: [number, number];
}

export const galleryCategories: GalleryCategory[] = [
  "interiors",
  "furniture",
  "sacred",
  "craft",
];

/**
 * Curated wall of imagery, mixed across categories for a rich "All" view.
 * Every id is drawn from the project's validated Unsplash set.
 */
export const galleryItems: GalleryItem[] = [
  { id: "1600585154340-be6161a56a0c", category: "interiors", ratio: [4, 5] },
  { id: "1615529182904-14819c35db37", category: "craft", ratio: [4, 3] },
  { id: "1564769662533-4f00a87b4056", category: "sacred", ratio: [3, 4] },
  { id: "1616137466211-f939a420be84", category: "furniture", ratio: [4, 5] },
  { id: "1618221195710-dd6b41faaea6", category: "interiors", ratio: [3, 2] },
  { id: "1585036156171-384164a8c675", category: "sacred", ratio: [4, 5] },
  { id: "1600566752355-35792bedcfea", category: "craft", ratio: [3, 2] },
  { id: "1600607687939-ce8a6c25118c", category: "interiors", ratio: [4, 5] },
  { id: "1582719508461-905c673771fd", category: "furniture", ratio: [3, 4] },
  { id: "1616486338812-3dadae4b4ace", category: "interiors", ratio: [3, 4] },
  { id: "1519817650390-64a93db51149", category: "sacred", ratio: [3, 2] },
  { id: "1600566753086-00f18fb6b3ea", category: "interiors", ratio: [1, 1] },
  { id: "1600607687920-4e2a09cf159d", category: "craft", ratio: [4, 5] },
  { id: "1566073771259-6a8506099945", category: "interiors", ratio: [4, 3] },
];

const BASE = "https://images.unsplash.com/photo-";

/** Cropped thumbnail sized to the item's ratio (CLS-safe, lazy). */
export function galleryThumb(item: GalleryItem, w = 800): string {
  const h = Math.round((w * item.ratio[1]) / item.ratio[0]);
  return `${BASE}${item.id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

/** Large, uncropped source for the fullscreen lightbox. */
export function galleryFull(id: string, w = 1800): string {
  return `${BASE}${id}?auto=format&fit=max&w=${w}&q=85`;
}

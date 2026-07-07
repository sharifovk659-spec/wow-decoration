export type GalleryCategory =
  | "gazebo"
  | "interiors"
  | "ceilings"
  | "walls"
  | "doors"
  | "columns"
  | "furniture"
  | "daybeds"
  | "islamic"
  | "production"
  | "installation"
  | "beforeAfter";

export interface GalleryItem {
  key: string;
  photoId: string;
  category: GalleryCategory;
  ratio: [number, number];
}

export const galleryCategories: GalleryCategory[] = [
  "gazebo",
  "interiors",
  "ceilings",
  "walls",
  "doors",
  "columns",
  "furniture",
  "daybeds",
  "islamic",
  "production",
  "installation",
  "beforeAfter",
];

const POOL: { id: string; ratio: [number, number] }[] = [
  { id: "1600585154340-be6161a56a0c", ratio: [4, 5] },
  { id: "1615529182904-14819c35db37", ratio: [4, 3] },
  { id: "1618221195710-dd6b41faaea6", ratio: [3, 2] },
  { id: "1600566752355-35792bedcfea", ratio: [3, 2] },
  { id: "1600566753086-00f18fb6b3ea", ratio: [1, 1] },
  { id: "1585036156171-384164a8c675", ratio: [4, 5] },
  { id: "1600607687939-ce8a6c25118c", ratio: [4, 5] },
  { id: "1616137466211-f939a420be84", ratio: [4, 5] },
  { id: "1564769662533-4f00a87b4056", ratio: [3, 4] },
  { id: "1600607687920-4e2a09cf159d", ratio: [4, 5] },
  { id: "1616486338812-3dadae4b4ace", ratio: [3, 4] },
  { id: "1519817650390-64a93db51149", ratio: [3, 2] },
];

function itemsFor(
  category: GalleryCategory,
  count: number,
  offset: number,
): GalleryItem[] {
  return Array.from({ length: count }, (_, i) => {
    const p = POOL[(offset + i) % POOL.length]!;
    return {
      key: `${category}-${i}`,
      photoId: p.id,
      category,
      ratio: p.ratio,
    };
  });
}

export const galleryItems: GalleryItem[] = [
  ...itemsFor("gazebo", 5, 0),
  ...itemsFor("interiors", 6, 1),
  ...itemsFor("ceilings", 4, 2),
  ...itemsFor("walls", 5, 3),
  ...itemsFor("doors", 4, 4),
  ...itemsFor("columns", 4, 5),
  ...itemsFor("furniture", 5, 6),
  ...itemsFor("daybeds", 3, 7),
  ...itemsFor("islamic", 5, 8),
  ...itemsFor("production", 6, 9),
  ...itemsFor("installation", 5, 10),
  ...itemsFor("beforeAfter", 4, 11),
];

const BASE = "https://images.unsplash.com/photo-";

export function galleryThumb(item: GalleryItem, w = 800): string {
  const h = Math.round((w * item.ratio[1]) / item.ratio[0]);
  return `${BASE}${item.photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export function galleryFull(item: GalleryItem, w = 1800): string {
  return `${BASE}${item.photoId}?auto=format&fit=max&w=${w}&q=85`;
}

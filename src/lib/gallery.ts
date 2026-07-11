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
  src: string;
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

/** Real project photography — mapped from the IMG folder by category. */
export const galleryItems: GalleryItem[] = [
  { key: "gazebo-0", src: "/images/gallery/gazebo.jpg", category: "gazebo", ratio: [4, 3] },
  { key: "gazebo-1", src: "/images/gallery/gazebo-royal.jpg", category: "gazebo", ratio: [4, 3] },
  { key: "interiors-0", src: "/images/gallery/interiors.jpg", category: "interiors", ratio: [4, 3] },
  { key: "interiors-1", src: "/images/projects/wyndham-grand-hotel.jpg", category: "interiors", ratio: [4, 3] },
  { key: "interiors-2", src: "/images/projects/palace-nation.jpg", category: "interiors", ratio: [4, 3] },
  { key: "ceilings-0", src: "/images/projects/kohi-navruz.jpg", category: "ceilings", ratio: [4, 3] },
  { key: "ceilings-1", src: "/images/gallery/interiors.jpg", category: "ceilings", ratio: [3, 4] },
  { key: "walls-0", src: "/images/gallery/walls.jpg", category: "walls", ratio: [4, 3] },
  { key: "walls-1", src: "/images/projects/expo-qatar.jpg", category: "walls", ratio: [4, 3] },
  { key: "doors-0", src: "/images/projects/parliament-tajikistan.jpg", category: "doors", ratio: [4, 3] },
  { key: "columns-0", src: "/images/gallery/government.jpg", category: "columns", ratio: [3, 4] },
  { key: "columns-1", src: "/images/projects/kohi-navruz.jpg", category: "columns", ratio: [4, 3] },
  { key: "furniture-0", src: "/images/gallery/furniture.jpg", category: "furniture", ratio: [4, 3] },
  { key: "daybeds-0", src: "/images/gallery/daybeds.jpg", category: "daybeds", ratio: [4, 3] },
  { key: "islamic-0", src: "/images/gallery/islamic.jpg", category: "islamic", ratio: [4, 3] },
  { key: "islamic-1", src: "/images/projects/kohi-navruz.jpg", category: "islamic", ratio: [3, 4] },
  { key: "production-0", src: "/images/gallery/production.jpg", category: "production", ratio: [4, 3] },
  { key: "installation-0", src: "/images/gallery/installation.jpg", category: "installation", ratio: [4, 3] },
  { key: "beforeAfter-0", src: "/images/gallery/commercial.jpg", category: "beforeAfter", ratio: [4, 3] },
  { key: "beforeAfter-1", src: "/images/projects/national-botanical-garden.jpg", category: "beforeAfter", ratio: [4, 3] },
];

export function galleryThumb(item: GalleryItem): string {
  return item.src;
}

export function galleryFull(item: GalleryItem): string {
  return item.src;
}

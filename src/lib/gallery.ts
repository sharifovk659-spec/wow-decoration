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

/** User project photos only — «Дворец наци» and «2015 компания» live in About. */
export const galleryItems: GalleryItem[] = [
  { key: "ceilings-kohi", src: "/images/projects/kohi-navruz.jpg", category: "ceilings" },
  { key: "daybeds-topchan", src: "/images/projects/walnut-daybed.jpg", category: "daybeds" },
  { key: "gazebo-royal", src: "/images/projects/royal-gazebo-14x8.jpg", category: "gazebo" },
  { key: "columns-botanical", src: "/images/projects/national-botanical-garden.jpg", category: "columns" },
  { key: "interiors-wyndham", src: "/images/projects/wyndham-grand-hotel.jpg", category: "interiors" },
  { key: "beforeAfter-qatar", src: "/images/projects/expo-qatar.jpg", category: "beforeAfter" },
  { key: "islamic-main", src: "/images/gallery/islamic.jpg", category: "islamic" },
  { key: "furniture-tables", src: "/images/gallery/furniture.jpg", category: "furniture" },
  { key: "doors-parliament", src: "/images/projects/parliament-tajikistan.jpg", category: "doors" },
  { key: "interiors-villa", src: "/images/projects/private-villa-interior.jpg", category: "interiors" },
  { key: "ceilings-gallery-0101", src: "/images/gallery/gallery-0101.jpg", category: "ceilings" },
  { key: "interiors-gallery-0220", src: "/images/gallery/gallery-0220.jpg", category: "interiors" },
  { key: "furniture-gallery-033", src: "/images/gallery/gallery-033.jpg", category: "furniture" },
];

export function galleryThumb(item: GalleryItem): string {
  return item.src;
}

export function galleryFull(item: GalleryItem): string {
  return item.src;
}

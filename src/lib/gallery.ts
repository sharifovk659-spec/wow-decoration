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

/** Real project photography — uniform 3:2 grid on gallery page. */
export const galleryItems: GalleryItem[] = [
  { key: "gazebo-0", src: "/images/gallery/gazebo.jpg", category: "gazebo" },
  { key: "gazebo-1", src: "/images/gallery/gazebo-royal.jpg", category: "gazebo" },
  { key: "interiors-0", src: "/images/gallery/interiors.jpg", category: "interiors" },
  { key: "interiors-1", src: "/images/projects/wyndham-grand-hotel.jpg", category: "interiors" },
  { key: "interiors-2", src: "/images/projects/palace-nation.jpg", category: "interiors" },
  { key: "interiors-3", src: "/images/projects/private-villa-interior.jpg", category: "interiors" },
  { key: "ceilings-0", src: "/images/projects/kohi-navruz.jpg", category: "ceilings" },
  { key: "walls-0", src: "/images/gallery/walls.jpg", category: "walls" },
  { key: "walls-1", src: "/images/projects/expo-qatar.jpg", category: "walls" },
  { key: "doors-0", src: "/images/projects/parliament-tajikistan.jpg", category: "doors" },
  { key: "columns-0", src: "/images/gallery/government.jpg", category: "columns" },
  { key: "furniture-0", src: "/images/gallery/furniture.jpg", category: "furniture" },
  { key: "daybeds-0", src: "/images/gallery/daybeds.jpg", category: "daybeds" },
  { key: "islamic-0", src: "/images/gallery/islamic.jpg", category: "islamic" },
  { key: "production-0", src: "/images/gallery/production.jpg", category: "production" },
  { key: "installation-0", src: "/images/gallery/installation.jpg", category: "installation" },
  { key: "beforeAfter-0", src: "/images/gallery/commercial.jpg", category: "beforeAfter" },
  { key: "beforeAfter-1", src: "/images/projects/national-botanical-garden.jpg", category: "beforeAfter" },
  { key: "gazebo-2", src: "/images/projects/royal-gazebo-14x8.jpg", category: "gazebo" },
  { key: "commercial-0", src: "/images/projects/expo-dubai.jpg", category: "beforeAfter" },
];

export function galleryThumb(item: GalleryItem): string {
  return item.src;
}

export function galleryFull(item: GalleryItem): string {
  return item.src;
}

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

/** New project photos from camera (DSC) + established works. */
export const galleryItems: GalleryItem[] = [
  // DSC set (user selection — all 29)
  { key: "dsc-05641", src: "/images/gallery/dsc-05641.jpg", category: "ceilings" },
  { key: "dsc-05640", src: "/images/gallery/dsc-05640.jpg", category: "ceilings" },
  { key: "dsc-05622", src: "/images/gallery/dsc-05622.jpg", category: "ceilings" },
  { key: "dsc-05621", src: "/images/gallery/dsc-05621.jpg", category: "ceilings" },
  { key: "dsc-05596", src: "/images/gallery/dsc-05596.jpg", category: "interiors" },
  { key: "dsc-05595", src: "/images/gallery/dsc-05595.jpg", category: "interiors" },
  { key: "dsc-05557", src: "/images/gallery/dsc-05557.jpg", category: "walls" },
  { key: "dsc-05556", src: "/images/gallery/dsc-05556.jpg", category: "walls" },
  { key: "dsc-05548", src: "/images/gallery/dsc-05548.jpg", category: "walls" },
  { key: "dsc-05545", src: "/images/gallery/dsc-05545.jpg", category: "walls" },
  { key: "dsc-05423", src: "/images/gallery/dsc-05423.jpg", category: "furniture" },
  { key: "dsc-05422", src: "/images/gallery/dsc-05422.jpg", category: "furniture" },
  { key: "dsc-05399", src: "/images/gallery/dsc-05399.jpg", category: "interiors" },
  { key: "dsc-05394", src: "/images/gallery/dsc-05394.jpg", category: "interiors" },
  { key: "dsc-05347", src: "/images/gallery/dsc-05347.jpg", category: "interiors" },
  { key: "dsc-05343", src: "/images/gallery/dsc-05343.jpg", category: "interiors" },
  { key: "dsc-05341", src: "/images/gallery/dsc-05341.jpg", category: "interiors" },
  { key: "dsc-05335", src: "/images/gallery/dsc-05335.jpg", category: "interiors" },
  { key: "dsc-05334", src: "/images/gallery/dsc-05334.jpg", category: "interiors" },
  { key: "dsc-05332", src: "/images/gallery/dsc-05332.jpg", category: "interiors" },
  { key: "dsc-05323", src: "/images/gallery/dsc-05323.jpg", category: "interiors" },
  { key: "dsc-05304", src: "/images/gallery/dsc-05304.jpg", category: "interiors" },
  { key: "dsc-05257", src: "/images/gallery/dsc-05257.jpg", category: "gazebo" },
  { key: "dsc-05256", src: "/images/gallery/dsc-05256.jpg", category: "gazebo" },
  { key: "dsc-05249", src: "/images/gallery/dsc-05249.jpg", category: "gazebo" },
  { key: "dsc-05247", src: "/images/gallery/dsc-05247.jpg", category: "gazebo" },
  { key: "dsc-05211", src: "/images/gallery/dsc-05211.jpg", category: "columns" },
  { key: "dsc-05210", src: "/images/gallery/dsc-05210.jpg", category: "columns" },
  { key: "dsc-05209", src: "/images/gallery/dsc-05209.jpg", category: "columns" },

  // Established works
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
];

export function galleryThumb(item: GalleryItem): string {
  return item.src;
}

export function galleryFull(item: GalleryItem): string {
  return item.src;
}

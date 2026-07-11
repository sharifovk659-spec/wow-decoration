import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imgDir = path.join(root, "IMG");

/** Source filename substring → destination under public/images/ */
const MAP = [
  ["Кохи Навруз", "projects/kohi-navruz.jpg"],
  ["Дворец наци", "projects/palace-nation.jpg"],
  ["Виставка в катаре", "projects/expo-qatar.jpg"],
  ["Отель Видхем", "projects/wyndham-grand-hotel.jpg"],
  ["Национальный ботани", "projects/national-botanical-garden.jpg"],
  ["Королевская беседка", "projects/royal-gazebo-14x8.jpg"],
  ["Топчан", "projects/walnut-daybed.jpg"],
  ["Роскошные интерьеры", "projects/private-villa-interior.jpg"],
  ["Бизнес проект", "projects/expo-dubai.jpg"],
  ["Двери и окна", "projects/parliament-tajikistan.jpg"],
  ["Беседки", "gallery/gazebo.jpg"],
  ["Столы и стулья", "gallery/furniture.jpg"],
  ["Производство и установка", "gallery/production.jpg"],
  ["Исламсик", "gallery/islamic.jpg"],
  ["Древесина", "materials/wood-grain.jpg"],
];

function findSource(substr) {
  const files = fs.readdirSync(imgDir);
  const hit = files.find((f) => f.includes(substr));
  if (!hit) throw new Error(`Missing IMG file matching: ${substr}`);
  return path.join(imgDir, hit);
}

async function convertToJpeg(src, dest) {
  const ext = path.extname(src).toLowerCase();
  try {
    const sharp = (await import("sharp")).default;
    await sharp(src).rotate().jpeg({ quality: 88, mozjpeg: true }).toFile(dest);
  } catch {
    if (ext === ".jpg" || ext === ".jpeg") {
      fs.copyFileSync(src, dest);
      return;
    }
    const alt = dest.replace(/\.jpg$/, ext);
    fs.copyFileSync(src, alt);
    if (alt !== dest) fs.copyFileSync(src, dest);
  }
}

async function main() {
  fs.mkdirSync(path.join(root, "public/images/projects"), { recursive: true });
  fs.mkdirSync(path.join(root, "public/images/gallery"), { recursive: true });
  fs.mkdirSync(path.join(root, "public/images/materials"), { recursive: true });

  for (const [substr, relDest] of MAP) {
    const src = findSource(substr);
    const dest = path.join(root, "public/images", relDest);
    console.log(`${path.basename(src)} → ${relDest}`);
    await convertToJpeg(src, dest);
  }

  // Same production photo for installation category
  fs.copyFileSync(
    path.join(root, "public/images/gallery/production.jpg"),
    path.join(root, "public/images/gallery/installation.jpg"),
  );
  console.log("Copied production.jpg → gallery/installation.jpg");

  // Extra gallery entries from project covers
  const extras = [
    ["projects/kohi-navruz.jpg", "gallery/government.jpg"],
    ["projects/private-villa-interior.jpg", "gallery/interiors.jpg"],
    ["projects/walnut-daybed.jpg", "gallery/daybeds.jpg"],
    ["projects/expo-dubai.jpg", "gallery/commercial.jpg"],
    ["materials/wood-grain.jpg", "gallery/walls.jpg"],
    ["projects/royal-gazebo-14x8.jpg", "gallery/gazebo-royal.jpg"],
  ];
  for (const [from, to] of extras) {
    fs.copyFileSync(path.join(root, "public/images", from), path.join(root, "public/images", to));
    console.log(`Copied ${from} → ${to}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

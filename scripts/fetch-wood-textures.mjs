import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "public/images/materials");

/** Tree / species photos matched to card names (Unsplash, free license). */
const WOODS = [
  {
    file: "oak.jpg",
    url: "https://images.unsplash.com/photo-1762891993331-d2ab60346457?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "walnut.jpg",
    url: "https://images.unsplash.com/photo-1726900711795-d98c119e90ae?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "beech.jpg",
    url: "https://images.unsplash.com/photo-1678562393030-2bcd241c4e1b?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "ash.jpg",
    url: "https://images.unsplash.com/photo-1740243059272-87e509f45615?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "pine.jpg",
    url: "https://images.unsplash.com/photo-1768734463253-5e6744e281ca?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "cedar.jpg",
    url: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "abachi.jpg",
    url: "https://images.unsplash.com/photo-1770573321383-4367691d87df?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
];

const WIDTH = 1200;
const HEIGHT = 900;
const QUALITY = 92;

async function downloadBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const sharp = (await import("sharp")).default;

  for (const { file, url } of WOODS) {
    const raw = await downloadBuffer(url);
    const dest = path.join(out, file);
    await sharp(raw)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
      .sharpen({ sigma: 0.4 })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(dest);
    console.log(`✓ materials/${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

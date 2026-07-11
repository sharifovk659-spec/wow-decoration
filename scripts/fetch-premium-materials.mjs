import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "public/images/materials");

/** Wood grain close-ups for the 4 premium materials list (Pexels, free license). */
const MATERIALS = [
  {
    file: "black-walnut.jpg",
    url: "https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1400&fit=crop",
  },
  {
    file: "european-oak.jpg",
    url: "https://images.pexels.com/photos/172276/pexels-photo-172276.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1400&fit=crop",
  },
  {
    file: "macassar-ebony.jpg",
    url: "https://images.pexels.com/photos/9302065/pexels-photo-9302065.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1400&fit=crop",
  },
  {
    file: "burmese-teak.jpg",
    url: "https://images.pexels.com/photos/172294/pexels-photo-172294.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1400&fit=crop",
  },
];

const SIZE = 1200;
const QUALITY = 92;

async function downloadBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const sharp = (await import("sharp")).default;

  for (const { file, url } of MATERIALS) {
    const raw = await downloadBuffer(url);
    await sharp(raw)
      .rotate()
      .resize(SIZE, SIZE, { fit: "cover", position: "center" })
      .sharpen({ sigma: 0.35 })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(path.join(out, file));
    console.log(`✓ materials/${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

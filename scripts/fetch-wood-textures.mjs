import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "public/images/materials/woods");

/** Wood grain close-ups for species cards (Pexels FWStudio, free license). */
const WOODS = [
  {
    file: "oak.jpg",
    url: "https://images.pexels.com/photos/172276/pexels-photo-172276.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1050&fit=crop",
  },
  {
    file: "walnut.jpg",
    url: "https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1050&fit=crop",
  },
  {
    file: "beech.jpg",
    url: "https://images.pexels.com/photos/172277/pexels-photo-172277.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1050&fit=crop",
  },
  {
    file: "ash.jpg",
    url: "https://images.pexels.com/photos/172282/pexels-photo-172282.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1050&fit=crop",
  },
  {
    file: "pine.jpg",
    url: "https://images.pexels.com/photos/172280/pexels-photo-172280.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1050&fit=crop",
  },
  {
    file: "cedar.jpg",
    url: "https://images.pexels.com/photos/172278/pexels-photo-172278.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1050&fit=crop",
  },
  {
    file: "abachi.jpg",
    url: "https://images.pexels.com/photos/172294/pexels-photo-172294.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1050&fit=crop",
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
    await sharp(raw)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
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

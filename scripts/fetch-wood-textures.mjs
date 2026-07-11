import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "public/images/materials");

/** High-quality wood grain close-ups (Unsplash, free license). */
const WOODS = [
  {
    file: "oak.jpg",
    url: "https://images.unsplash.com/photo-1644931551533-02906718127f?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "walnut.jpg",
    url: "https://images.unsplash.com/photo-1736506159893-22cca29b8018?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "beech.jpg",
    url: "https://images.unsplash.com/photo-1763392199096-6efd9d28d8cc?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "ash.jpg",
    url: "https://images.unsplash.com/photo-1762978902169-e5789f7b56b8?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "pine.jpg",
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "cedar.jpg",
    url: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1400&h=1050&q=92",
  },
  {
    file: "abachi.jpg",
    url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&h=1050&q=92",
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
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
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

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "public/images/production");

/** Step images matched to production titles (Unsplash, free license). */
const STEPS = [
  {
    file: "step-0.jpg",
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-1.jpg",
    url: "https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-2.jpg",
    url: "https://images.unsplash.com/photo-1414497729697-b8555ba6c1cc?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-3.jpg",
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-4.jpg",
    url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-5.jpg",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-6.jpg",
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-7.jpg",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&h=800&q=92",
  },
];

const WIDTH = 1400;
const HEIGHT = 700;
const QUALITY = 92;

async function downloadBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const sharp = (await import("sharp")).default;

  for (const { file, url } of STEPS) {
    const raw = await downloadBuffer(url);
    await sharp(raw)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(path.join(out, file));
    console.log(`✓ production/${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

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
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-4.jpg",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-5.jpg",
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-6.jpg",
    url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-7.jpg",
    local: "gallery/installation.jpg",
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

  for (const step of STEPS) {
    const raw = step.local
      ? await sharp(
          path.join(root, "public/images", step.local),
        )
          .rotate()
          .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
          .jpeg({ quality: QUALITY, mozjpeg: true })
          .toBuffer()
      : await downloadBuffer(step.url);
    if (!step.local) {
      await sharp(raw)
        .rotate()
        .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(path.join(out, step.file));
    } else {
      await sharp(raw)
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(path.join(out, step.file));
    }
    console.log(`✓ production/${step.file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

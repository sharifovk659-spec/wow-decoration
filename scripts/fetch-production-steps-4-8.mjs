import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "public/images/production/v2");

/** Steps 04–08 only — matched to production titles. */
const STEPS = [
  {
    file: "step-3.jpg",
    label: "04 Сборка",
    url: "https://images.pexels.com/photos/15016509/pexels-photo-15016509.jpeg?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-4.jpg",
    label: "05 Лакировка",
    url: "https://images.pexels.com/photos/37661593/pexels-photo-37661593.jpeg?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-5.jpg",
    label: "06 Упаковка",
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-6.jpg",
    label: "07 Погрузка",
    url: "https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=format&fit=crop&w=1600&h=800&q=92",
  },
  {
    file: "step-7.jpg",
    label: "08 Установка",
    url: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=format&fit=crop&w=1600&h=800&q=92",
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
    const raw = await downloadBuffer(step.url);
    await sharp(raw)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(path.join(out, step.file));
    console.log(`✓ ${step.label} → production/${step.file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "IMG", "Кохи Навруз.PNG");
const dest = path.join(root, "public/images/projects/kohi-navruz.jpg");
const gallery = path.join(root, "public/images/gallery/government.jpg");

/** Landscape hero ratio — portrait source cropped with attention focus. */
const WIDTH = 1920;
const HEIGHT = 1280;
const QUALITY = 92;

async function main() {
  const sharp = (await import("sharp")).default;
  const pipeline = sharp(src)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
    .sharpen({ sigma: 0.6, m1: 0.5, m2: 0.3 })
    .jpeg({ quality: QUALITY, mozjpeg: true });

  await pipeline.toFile(dest);
  fs.copyFileSync(dest, gallery);

  const meta = await sharp(dest).metadata();
  console.log(`✓ kohi-navruz.jpg ${meta.width}x${meta.height} q${QUALITY}`);
  console.log("✓ gallery/government.jpg updated");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

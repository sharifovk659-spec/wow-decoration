import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const WIDTH = 1200;
const HEIGHT = 900;
const QUALITY = 85;

const DIRS = ["public/images/gallery", "public/images/projects"];

async function normalizeFile(filePath) {
  const sharp = (await import("sharp")).default;
  const tmp = `${filePath}.tmp.jpg`;
  await sharp(filePath)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp);
  fs.renameSync(tmp, filePath);
}

async function main() {
  for (const dir of DIRS) {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs)) {
      if (!/\.(jpg|jpeg|png|webp)$/i.test(name)) continue;
      const file = path.join(abs, name);
      console.log(`Normalize ${dir}/${name}`);
      try {
        await normalizeFile(file);
      } catch (err) {
        console.error(`Failed ${name}:`, err.message);
      }
    }
  }

  const heic = path.join(root, "public/images/gallery/islamic.heic");
  if (fs.existsSync(heic)) fs.unlinkSync(heic);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

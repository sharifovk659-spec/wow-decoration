import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const photos = path.join(root, "public/images/photos");
const out = path.join(root, "public/images/materials");

/** Wood grain textures — sourced from bundled photo library (close-up grain shots). */
const MAP = [
  ["1600566752355-35792bedcfea.jpg", "oak.jpg"],
  ["1600585154340-be6161a56a0c.jpg", "walnut.jpg"],
  ["1600566753086-00f18fb6b3ea.jpg", "beech.jpg"],
  ["1600607687939-ce8a6c25118c.jpg", "ash.jpg"],
  ["1618221195710-dd6b41faaea6.jpg", "pine.jpg"],
  ["1585036156171-384164a8c675.jpg", "cedar.jpg"],
  ["1615529182904-14819c35db37.jpg", "abachi.jpg"],
];

fs.mkdirSync(out, { recursive: true });

for (const [src, dest] of MAP) {
  const from = path.join(photos, src);
  const to = path.join(out, dest);
  if (!fs.existsSync(from)) throw new Error(`Missing ${from}`);
  fs.copyFileSync(from, to);
  console.log(`${src} → materials/${dest}`);
}

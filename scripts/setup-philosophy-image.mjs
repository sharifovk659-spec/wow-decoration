import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const candidates = [
  path.join(
    root,
    "assets",
    "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_0346be273852f9a64ded35298fc1d781_images__________-246aac69-43bc-4453-a9c6-1c9b3bb62263.png",
  ),
  path.join(
    process.env.USERPROFILE ?? "",
    ".cursor",
    "projects",
    "c-Users-admin-Desktop-0101",
    "assets",
    "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_0346be273852f9a64ded35298fc1d781_images__________-246aac69-43bc-4453-a9c6-1c9b3bb62263.png",
  ),
];

const src = candidates.find((p) => fs.existsSync(p));
if (!src) throw new Error("Kohi Navruz hall source image not found");

const philosophyOut = path.join(root, "public/images/philosophy/kohi-hall.jpg");
const coverOut = path.join(root, "public/images/projects/kohi-navruz.jpg");
const galleryOut = path.join(root, "public/images/gallery/government.jpg");

async function main() {
  fs.mkdirSync(path.dirname(philosophyOut), { recursive: true });
  const sharp = (await import("sharp")).default;

  const base = sharp(src).rotate();

  await base
    .clone()
    .resize(1920, 1280, { fit: "cover", position: "attention" })
    .sharpen({ sigma: 0.5 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(coverOut);

  await base
    .clone()
    .resize(1200, 1500, { fit: "cover", position: "attention" })
    .sharpen({ sigma: 0.5 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(philosophyOut);

  fs.copyFileSync(coverOut, galleryOut);
  console.log("✓ philosophy/kohi-hall.jpg");
  console.log("✓ projects/kohi-navruz.jpg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

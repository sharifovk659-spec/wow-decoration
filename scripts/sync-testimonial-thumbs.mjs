import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images", "testimonials");

/** Card id → YouTube Shorts video id (@worldofwooddecoration). */
const SHORTS = [
  { id: "0", youtubeId: "Ka697QCAe5s" },
  { id: "1", youtubeId: "-B6JMuL6dKA" },
  { id: "2", youtubeId: "vqlolLqhMa8" },
  { id: "3", youtubeId: "boJ6XNyzuGA" },
  { id: "4", youtubeId: "_9xkhgfp0VI" },
  { id: "5", youtubeId: "lV9M2mOh_io" },
  { id: "6", youtubeId: "F14wyhzLMpU" },
  { id: "7", youtubeId: "8sM5lDu1EwM" },
];

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2048) return null;
  return buf;
}

async function downloadPoster(youtubeId) {
  const candidates = [
    `https://i.ytimg.com/vi/${youtubeId}/oardefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
  ];

  for (const url of candidates) {
    const buf = await fetchBuffer(url);
    if (buf) return buf;
  }
  throw new Error(`No thumbnail for ${youtubeId}`);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const sharp = (await import("sharp")).default;

  for (const { id, youtubeId } of SHORTS) {
    const raw = await downloadPoster(youtubeId);
    const dest = path.join(outDir, `${id}.jpg`);
    await sharp(raw)
      .rotate()
      .resize(720, 1280, { fit: "cover", position: "centre" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(dest);
    console.log(`✓ ${id}.jpg ← ${youtubeId}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

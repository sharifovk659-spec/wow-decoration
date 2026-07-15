import { randomBytes } from "crypto";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { UPLOADS_DIR, UPLOADS_PUBLIC_PREFIX } from "@/lib/cms/paths";

const MAX_BYTES = 80 * 1024 * 1024; // 80 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
]);

function extFor(type: string, original: string): string {
  const fromName = path.extname(original).toLowerCase();
  if (fromName && fromName.length <= 5) return fromName;
  if (type.includes("png")) return ".png";
  if (type.includes("webp")) return ".webp";
  if (type.includes("avif")) return ".avif";
  if (type.includes("webm")) return ".webm";
  if (type.includes("mp4")) return ".mp4";
  return ".jpg";
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type) && !file.name.match(/\.(jpe?g|png|webp|avif|mp4|webm)$/i)) {
    return NextResponse.json(
      { error: "Допустимы изображения и видео (jpg/png/webp/mp4)" },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Файл слишком большой (макс. 80 МБ)" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const stamp = Date.now();
  const rand = randomBytes(4).toString("hex");
  const ext = extFor(file.type, file.name);
  const folder = file.type.startsWith("video/") ? "videos" : "images";
  const rel = `${folder}/${stamp}-${rand}${ext}`;
  const abs = path.join(UPLOADS_DIR, rel);

  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, buf);

  const url = `${UPLOADS_PUBLIC_PREFIX}/${rel.replace(/\\/g, "/")}`;
  return NextResponse.json({ url, size: file.size, type: file.type });
}

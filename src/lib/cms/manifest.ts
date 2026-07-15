import fs from "fs/promises";
import path from "path";
import { EMPTY_MANIFEST, type CmsManifest } from "@/lib/cms/types";
import { CMS_DATA_DIR, CMS_MANIFEST_PATH } from "@/lib/cms/paths";

const PUBLIC_MANIFEST_PATH = path.join(
  process.cwd(),
  "public",
  "cms",
  "manifest.json",
);

function normalize(raw: unknown): CmsManifest {
  const base = { ...EMPTY_MANIFEST };
  if (!raw || typeof raw !== "object") return base;
  const data = raw as Partial<CmsManifest>;
  return {
    version: typeof data.version === "number" ? data.version : 1,
    updatedAt: data.updatedAt ?? null,
    productionSteps:
      data.productionSteps && typeof data.productionSteps === "object"
        ? { ...data.productionSteps }
        : {},
    gallery: Array.isArray(data.gallery) ? data.gallery : null,
    hero: {
      poster: data.hero?.poster ?? null,
      video: data.hero?.video ?? null,
    },
    processVideo: {
      mp4: data.processVideo?.mp4 ?? null,
      poster: data.processVideo?.poster ?? null,
    },
    projectCovers:
      data.projectCovers && typeof data.projectCovers === "object"
        ? { ...data.projectCovers }
        : {},
    videoTestimonials: Array.isArray(data.videoTestimonials)
      ? data.videoTestimonials
      : null,
  };
}

export async function readManifest(): Promise<CmsManifest> {
  try {
    const text = await fs.readFile(CMS_MANIFEST_PATH, "utf8");
    return normalize(JSON.parse(text) as unknown);
  } catch {
    return { ...EMPTY_MANIFEST };
  }
}

export async function writeManifest(manifest: CmsManifest): Promise<CmsManifest> {
  await fs.mkdir(CMS_DATA_DIR, { recursive: true });
  await fs.mkdir(path.dirname(PUBLIC_MANIFEST_PATH), { recursive: true });
  const next: CmsManifest = {
    ...normalize(manifest),
    updatedAt: new Date().toISOString(),
  };
  const body = `${JSON.stringify(next, null, 2)}\n`;
  await fs.writeFile(CMS_MANIFEST_PATH, body, "utf8");
  await fs.writeFile(PUBLIC_MANIFEST_PATH, body, "utf8");
  return next;
}

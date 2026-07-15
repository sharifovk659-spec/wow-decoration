import { list, put } from "@vercel/blob";
import type { CmsManifest } from "@/lib/cms/types";
import { EMPTY_MANIFEST } from "@/lib/cms/types";

export const MANIFEST_BLOB_PATH = "cms/manifest.json";

export function useBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

export function normalizeManifest(raw: unknown): CmsManifest {
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

export async function readManifestFromBlob(): Promise<CmsManifest | null> {
  if (!useBlobStorage()) return null;
  try {
    const { blobs } = await list({
      prefix: MANIFEST_BLOB_PATH,
      limit: 5,
    });
    const hit =
      blobs.find((b) => b.pathname === MANIFEST_BLOB_PATH) ?? blobs[0];
    if (!hit?.url) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    return normalizeManifest((await res.json()) as unknown);
  } catch {
    return null;
  }
}

export async function writeManifestToBlob(
  manifest: CmsManifest,
): Promise<CmsManifest> {
  const next: CmsManifest = {
    ...normalizeManifest(manifest),
    updatedAt: new Date().toISOString(),
  };
  await put(MANIFEST_BLOB_PATH, `${JSON.stringify(next, null, 2)}\n`, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return next;
}

export async function uploadToBlob(
  pathname: string,
  data: Buffer,
  contentType: string,
): Promise<string> {
  const blob = await put(pathname, data, {
    access: "public",
    addRandomSuffix: false,
    contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}

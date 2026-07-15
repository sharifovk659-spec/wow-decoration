import fs from "fs/promises";
import path from "path";
import type { CmsManifest } from "@/lib/cms/types";
import { EMPTY_MANIFEST } from "@/lib/cms/types";
import { CMS_DATA_DIR, CMS_MANIFEST_PATH } from "@/lib/cms/paths";
import {
  isVercelRuntime,
  normalizeManifest,
  readManifestFromBlob,
  useBlobStorage,
  writeManifestToBlob,
} from "@/lib/cms/blob";

const PUBLIC_MANIFEST_PATH = path.join(
  process.cwd(),
  "public",
  "cms",
  "manifest.json",
);

async function readManifestFromDisk(): Promise<CmsManifest> {
  try {
    const text = await fs.readFile(CMS_MANIFEST_PATH, "utf8");
    return normalizeManifest(JSON.parse(text) as unknown);
  } catch {
    try {
      const text = await fs.readFile(PUBLIC_MANIFEST_PATH, "utf8");
      return normalizeManifest(JSON.parse(text) as unknown);
    } catch {
      return { ...EMPTY_MANIFEST };
    }
  }
}

async function writeManifestToDisk(manifest: CmsManifest): Promise<CmsManifest> {
  await fs.mkdir(CMS_DATA_DIR, { recursive: true });
  await fs.mkdir(path.dirname(PUBLIC_MANIFEST_PATH), { recursive: true });
  const next: CmsManifest = {
    ...normalizeManifest(manifest),
    updatedAt: new Date().toISOString(),
  };
  const body = `${JSON.stringify(next, null, 2)}\n`;
  await fs.writeFile(CMS_MANIFEST_PATH, body, "utf8");
  await fs.writeFile(PUBLIC_MANIFEST_PATH, body, "utf8");
  return next;
}

export async function readManifest(): Promise<CmsManifest> {
  if (useBlobStorage()) {
    const fromBlob = await readManifestFromBlob();
    if (fromBlob) return fromBlob;
  }
  return readManifestFromDisk();
}

export async function writeManifest(manifest: CmsManifest): Promise<CmsManifest> {
  if (useBlobStorage()) {
    return writeManifestToBlob(manifest);
  }
  if (isVercelRuntime()) {
    throw new Error(
      "На Vercel нужен BLOB_READ_WRITE_TOKEN (Vercel Blob), иначе админ не сохранит изменения.",
    );
  }
  return writeManifestToDisk(manifest);
}

import path from "path";

export const CMS_DATA_DIR = path.join(process.cwd(), "data", "cms");
export const CMS_MANIFEST_PATH = path.join(CMS_DATA_DIR, "manifest.json");
export const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
export const UPLOADS_PUBLIC_PREFIX = "/uploads";

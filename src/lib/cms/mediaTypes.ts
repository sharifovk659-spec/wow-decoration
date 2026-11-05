/** Shared allow-lists for admin uploads (images + all common video types). */

export const IMAGE_MIME = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const VIDEO_MIME = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-m4v",
  "video/ogg",
  "video/mpeg",
  "video/3gpp",
  "video/3gpp2",
  "video/x-msvideo",
  "video/avi",
  "video/x-matroska",
  "video/mp2t",
] as const;

export const UPLOAD_MIME = [...IMAGE_MIME, ...VIDEO_MIME] as const;

export const VIDEO_ACCEPT =
  "video/*,.mp4,.webm,.mov,.m4v,.ogg,.ogv,.mpeg,.mpg,.3gp,.3g2,.avi,.mkv,.m2ts,.mts";

export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/*";

const VIDEO_EXT =
  /\.(mp4|webm|mov|m4v|ogg|ogv|mpeg|mpg|3gp|3g2|avi|mkv|m2ts|mts)$/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

export function isAllowedUpload(file: {
  type: string;
  name: string;
}): boolean {
  const type = (file.type || "").toLowerCase();
  if (type && (UPLOAD_MIME as readonly string[]).includes(type)) return true;
  if (type.startsWith("video/") || type.startsWith("image/")) return true;
  return IMAGE_EXT.test(file.name) || VIDEO_EXT.test(file.name);
}

export function mimeFromVideoUrl(url: string): string | undefined {
  const path = url.split("?")[0]?.toLowerCase() ?? "";
  if (path.endsWith(".webm")) return "video/webm";
  if (path.endsWith(".mov")) return "video/quicktime";
  if (path.endsWith(".m4v")) return "video/x-m4v";
  if (path.endsWith(".ogg") || path.endsWith(".ogv")) return "video/ogg";
  if (path.endsWith(".mpeg") || path.endsWith(".mpg")) return "video/mpeg";
  if (path.endsWith(".3gp")) return "video/3gpp";
  if (path.endsWith(".avi")) return "video/x-msvideo";
  if (path.endsWith(".mkv")) return "video/x-matroska";
  if (path.endsWith(".mp4")) return "video/mp4";
  return undefined;
}

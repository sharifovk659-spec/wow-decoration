import type { InstagramPostKind } from "@/lib/cms/externalVideo";
import { isGenericFilmPoster } from "@/lib/cms/externalVideo";

const thumbCache = new Map<string, string>();

export function isGenericInstagramPoster(poster: string): boolean {
  return isGenericFilmPoster(poster);
}

/** Fetches Instagram reel/post preview from og:image (server only). */
export async function fetchInstagramThumbnail(
  shortcode: string,
  kind: InstagramPostKind = "reel",
): Promise<string | null> {
  const cacheKey = `${kind}:${shortcode}`;
  const hit = thumbCache.get(cacheKey);
  if (hit) return hit;

  const segment = kind === "p" ? "p" : "reel";
  const pageUrl = `https://www.instagram.com/${segment}/${shortcode}/`;

  try {
    const res = await fetch(pageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; WorldOfWoodDecoration/1.0; +https://wow-decoration.vercel.app)",
        Accept: "text/html",
      },
      next: { revalidate: 86_400 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/property="og:image" content="([^"]+)"/);
    if (!match?.[1]) return null;
    const poster = match[1].replace(/&amp;/g, "&");
    thumbCache.set(cacheKey, poster);
    return poster;
  } catch {
    return null;
  }
}

export async function enrichVideoTestimonials<
  T extends {
    poster: string;
    instagramId?: string | null;
    instagramKind?: InstagramPostKind | null;
  },
>(items: T[] | null): Promise<T[] | null> {
  if (!items?.length) return items;

  const enriched = await Promise.all(
    items.map(async (item) => {
      if (!item.instagramId || !isGenericInstagramPoster(item.poster)) {
        return item;
      }
      const thumb = await fetchInstagramThumbnail(
        item.instagramId,
        item.instagramKind ?? "reel",
      );
      return thumb ? { ...item, poster: thumb } : item;
    }),
  );

  return enriched;
}

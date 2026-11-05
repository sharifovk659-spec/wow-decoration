export type ExternalVideoProvider = "youtube" | "instagram";

export type InstagramPostKind = "reel" | "p";

export interface ParsedExternalVideo {
  provider: ExternalVideoProvider;
  /** YouTube 11-char id or Instagram shortcode. */
  id: string;
  instagramKind?: InstagramPostKind;
}

const DEFAULT_FILM_POSTER = "/images/hero/banner-01023.jpg";

/** Accepts raw YouTube ID or full YouTube / Shorts / youtu.be URL. */
export function parseYoutubeId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  if (/^[\w-]{11}$/.test(raw)) return raw;
  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = url.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      const marker = parts.findIndex((p) => p === "shorts" || p === "embed");
      const shortId = marker >= 0 ? parts[marker + 1] : undefined;
      if (shortId && /^[\w-]{11}$/.test(shortId)) {
        return shortId;
      }
    }
  } catch {
    /* not a URL */
  }
  const m = raw.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
  return m?.[1] ?? null;
}

/** Instagram reel / post / TV shortcode from URL or raw shortcode. */
export function parseInstagramShortcode(input: string): {
  id: string;
  kind: InstagramPostKind;
} | null {
  const raw = input.trim();
  if (!raw) return null;

  const shortcodePattern = /^[\w-]+$/;
  if (shortcodePattern.test(raw) && raw.length >= 5 && raw.length <= 64) {
    return { id: raw, kind: "reel" };
  }

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");
    if (host !== "instagram.com") return null;

    const parts = url.pathname.split("/").filter(Boolean);
    for (let i = 0; i < parts.length; i++) {
      const seg = parts[i]?.toLowerCase();
      if (seg === "reel" || seg === "reels" || seg === "p" || seg === "tv") {
        const code = parts[i + 1];
        if (code && shortcodePattern.test(code)) {
          const kind: InstagramPostKind =
            seg === "p" ? "p" : "reel";
          return { id: code, kind };
        }
      }
    }
  } catch {
    /* not a URL */
  }

  const m = raw.match(
    /instagram\.com\/(?:reel|reels|p|tv)\/([\w-]+)/i,
  );
  if (m?.[1]) {
    const kind: InstagramPostKind = /\/p\//i.test(raw) ? "p" : "reel";
    return { id: m[1], kind };
  }

  return null;
}

export function parseExternalVideoInput(
  input: string,
): ParsedExternalVideo | null {
  const yt = parseYoutubeId(input);
  if (yt) return { provider: "youtube", id: yt };

  const ig = parseInstagramShortcode(input);
  if (ig) {
    return {
      provider: "instagram",
      id: ig.id,
      instagramKind: ig.kind,
    };
  }

  return null;
}

export function youtubePosterUrl(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function instagramEmbedUrl(
  shortcode: string,
  kind: InstagramPostKind = "reel",
): string {
  const segment = kind === "p" ? "p" : "reel";
  return `https://www.instagram.com/${segment}/${shortcode}/embed/captioned/?cr=1&v=14`;
}

export function defaultFilmPoster(): string {
  return DEFAULT_FILM_POSTER;
}

export function isGenericFilmPoster(poster: string): boolean {
  const generic = DEFAULT_FILM_POSTER;
  return (
    poster === generic ||
    poster.endsWith("/images/hero/banner-01023.jpg") ||
    poster.includes("/images/hero/banner")
  );
}

export function slidePosterForFilm(film: {
  poster: string;
  instagramId?: string | null;
  instagramKind?: InstagramPostKind | null;
}): string {
  if (film.instagramId && isGenericFilmPoster(film.poster)) {
    const kind = film.instagramKind === "p" ? "p" : "reel";
    return `/api/cms/instagram-poster?shortcode=${encodeURIComponent(film.instagramId)}&kind=${kind}`;
  }
  return film.poster;
}

export function resolveFilmPlayback(film: {
  src?: string | null;
  youtubeId?: string;
  instagramId?: string | null;
  instagramKind?: InstagramPostKind | null;
}) {
  if (film.src) {
    return {
      src: film.src,
      youtubeId: null as string | null,
      instagramId: null as string | null,
      instagramKind: null as InstagramPostKind | null,
    };
  }
  if (film.instagramId) {
    return {
      src: null,
      youtubeId: null,
      instagramId: film.instagramId,
      instagramKind: (film.instagramKind ?? "reel") as InstagramPostKind,
    };
  }
  if (film.youtubeId) {
    return {
      src: null,
      youtubeId: film.youtubeId,
      instagramId: null,
      instagramKind: null as InstagramPostKind | null,
    };
  }
  return {
    src: null,
    youtubeId: null,
    instagramId: null,
    instagramKind: null as InstagramPostKind | null,
  };
}

export function posterForExternalVideo(parsed: ParsedExternalVideo): string {
  if (parsed.provider === "youtube") {
    return youtubePosterUrl(parsed.id);
  }
  return DEFAULT_FILM_POSTER;
}

export function externalLinkDisplay(film: {
  youtubeId?: string;
  instagramId?: string | null;
  instagramKind?: InstagramPostKind | null;
}): string {
  if (film.instagramId) {
    const segment =
      film.instagramKind === "p" ? "p" : "reel";
    return `https://www.instagram.com/${segment}/${film.instagramId}/`;
  }
  return film.youtubeId ?? "";
}

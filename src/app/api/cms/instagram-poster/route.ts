import { NextResponse } from "next/server";
import type { InstagramPostKind } from "@/lib/cms/externalVideo";
import { fetchInstagramThumbnail } from "@/lib/cms/instagramPoster";

export const runtime = "nodejs";

/** Public Instagram preview for client-film posters (redirect or JSON). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shortcode = searchParams.get("shortcode")?.trim();
  const kind: InstagramPostKind =
    searchParams.get("kind") === "p" ? "p" : "reel";
  const asJson = searchParams.get("format") === "json";

  if (!shortcode) {
    return NextResponse.json({ error: "shortcode required" }, { status: 400 });
  }

  const poster = await fetchInstagramThumbnail(shortcode, kind);
  if (!poster) {
    return NextResponse.json({ error: "thumbnail unavailable" }, { status: 404 });
  }

  if (asJson) {
    return NextResponse.json(
      { poster },
      { headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" } },
    );
  }

  return NextResponse.redirect(poster, {
    status: 302,
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

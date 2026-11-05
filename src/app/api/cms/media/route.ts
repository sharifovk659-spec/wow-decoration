import { NextResponse } from "next/server";
import { readManifest } from "@/lib/cms/manifest";
import { enrichVideoTestimonials } from "@/lib/cms/instagramPoster";

export const runtime = "nodejs";

/** Public media overrides for the live site (no auth). */
export async function GET() {
  const m = await readManifest();
  const videoTestimonials = await enrichVideoTestimonials(m.videoTestimonials);
  return NextResponse.json(
    {
      productionSteps: m.productionSteps,
      gallery: m.gallery,
      hero: m.hero,
      processVideo: m.processVideo,
      projectCovers: m.projectCovers,
      videoTestimonials,
      updatedAt: m.updatedAt,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=30, must-revalidate",
      },
    },
  );
}

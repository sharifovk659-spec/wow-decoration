import { NextResponse } from "next/server";
import { readManifest } from "@/lib/cms/manifest";

export const runtime = "nodejs";

/** Public media overrides for the live site (no auth). */
export async function GET() {
  const m = await readManifest();
  return NextResponse.json(
    {
      productionSteps: m.productionSteps,
      gallery: m.gallery,
      hero: m.hero,
      processVideo: m.processVideo,
      projectCovers: m.projectCovers,
      videoTestimonials: m.videoTestimonials,
      updatedAt: m.updatedAt,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=30, must-revalidate",
      },
    },
  );
}

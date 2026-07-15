import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { readManifest, writeManifest } from "@/lib/cms/manifest";
import type { CmsManifest } from "@/lib/cms/types";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const manifest = await readManifest();
  return NextResponse.json(manifest);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: CmsManifest;
  try {
    body = (await request.json()) as CmsManifest;
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }
  try {
    const saved = await writeManifest(body);
    return NextResponse.json(saved);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Ошибка сохранения";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

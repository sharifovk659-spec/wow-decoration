import { NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  validatePassword,
} from "@/lib/cms/auth";

export async function POST(request: Request) {
  let body: { password?: string } = {};
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const password = body.password?.trim() ?? "";
  if (!validatePassword(password)) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  const opts = sessionCookieOptions(token);
  res.cookies.set(opts.name, opts.value, opts);
  return res;
}

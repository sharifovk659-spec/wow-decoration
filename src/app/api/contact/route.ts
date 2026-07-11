import { NextResponse } from "next/server";
import { contactServerSchema } from "@/lib/validations";
import {
  isTelegramConfigured,
  sendContactToTelegram,
} from "@/lib/telegram";

/** Contact enquiry — validates and forwards to Telegram. */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const parsed = contactServerSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  if (!isTelegramConfigured()) {
    console.error(
      "[contact] TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are not set.",
    );
    return NextResponse.json(
      { error: "Contact delivery is not configured on the server." },
      { status: 503 },
    );
  }

  const sent = await sendContactToTelegram(parsed.data);
  if (!sent) {
    console.error("[contact] Telegram delivery failed.");
    return NextResponse.json(
      { error: "Failed to deliver enquiry. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

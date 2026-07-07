import { NextResponse } from "next/server";
import { contactServerSchema } from "@/lib/validations";

/**
 * Contact enquiry endpoint. Validates the payload server-side and rejects
 * honeypot submissions. Wire `CONTACT_INBOX_EMAIL` to an email provider
 * (Resend, SendGrid, SES…) where indicated to deliver enquiries.
 */
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

  // Honeypot: silently accept bots without processing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  // Integration point — deliver the enquiry to the company inbox.
  // e.g. await sendEmail({ to: process.env.CONTACT_INBOX_EMAIL, ...parsed.data })
  const { name, phone, country, projectType } = parsed.data;
  console.info(
    `[contact] enquiry from ${name} (${phone}) — ${country} / ${projectType}`,
  );

  return NextResponse.json({ ok: true }, { status: 200 });
}

import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SHORT = 120;
const MAX_MESSAGE = 4000;
const MAX_URL = 2048;

function trimString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const email = trimString(raw.email, 254);
  const message = trimString(raw.message, MAX_MESSAGE);
  const firstName = trimString(raw.firstName, MAX_SHORT);
  const lastName = trimString(raw.lastName, MAX_SHORT);
  const phone = trimString(raw.phone, MAX_SHORT);
  const country = trimString(raw.country, MAX_SHORT);
  const company = trimString(raw.company, MAX_SHORT);
  const title = trimString(raw.title, MAX_SHORT);
  const pageUrl = trimString(raw.pageUrl, MAX_URL);

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!message || message.length < 2) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  const inquiry = {
    firstName: firstName || null,
    lastName: lastName || null,
    email,
    phone: phone || null,
    country: country || null,
    company: company || null,
    title: title || null,
    message,
    pageUrl: pageUrl || null,
    submittedAt: new Date().toISOString(),
    source: "contact-page",
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();

  if (webhookUrl) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });

      if (!webhookRes.ok) {
        console.error("[contact] webhook failed", webhookRes.status);
        return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("[contact] webhook error", err);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[contact] received (no LEAD_WEBHOOK_URL):", inquiry);
  } else {
    console.warn("[contact] LEAD_WEBHOOK_URL not set — inquiry dropped in production");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

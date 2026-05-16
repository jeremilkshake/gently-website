import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;

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
  const email = typeof raw.email === "string" ? raw.email.trim().slice(0, MAX_EMAIL) : "";
  const message = typeof raw.message === "string" ? raw.message.trim().slice(0, MAX_MESSAGE) : "";
  const audience =
    raw.audience === "individual" || raw.audience === "business" ? raw.audience : undefined;
  const pageUrl = typeof raw.pageUrl === "string" ? raw.pageUrl.trim().slice(0, 2048) : undefined;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!message || message.length < 2) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  const lead = {
    email,
    message,
    audience: audience ?? null,
    pageUrl: pageUrl ?? null,
    submittedAt: new Date().toISOString(),
    source: "chat-widget",
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();

  if (webhookUrl) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!webhookRes.ok) {
        console.error("[chat-lead] webhook failed", webhookRes.status);
        return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("[chat-lead] webhook error", err);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[chat-lead] received (no LEAD_WEBHOOK_URL):", lead);
  } else {
    console.warn("[chat-lead] LEAD_WEBHOOK_URL not set — lead dropped in production");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

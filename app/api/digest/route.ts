import { NextResponse } from "next/server";
import { planDigest } from "@/lib/digest";

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 10_000) {
    return NextResponse.json({ ok: false, error: "That request is too large." }, { status: 413 });
  }

  let body: unknown = null;
  try {
    body = raw ? JSON.parse(raw) : null;
  } catch {
    return NextResponse.json({ ok: false, error: "Send JSON with an email field." }, { status: 400 });
  }

  const plan = planDigest(body, process.env.DIGEST_WEBHOOK_URL);

  if (plan.type === "invalid-email") {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
  }

  if (plan.type === "bad-webhook") {
    return NextResponse.json(
      {
        ok: false,
        error: "DIGEST_WEBHOOK_URL must be an https URL. Nothing was saved.",
      },
      { status: 500 },
    );
  }

  if (plan.type === "local") {
    return NextResponse.json({
      ok: true,
      mode: "local",
      message: "No DIGEST_WEBHOOK_URL set. Nothing was stored on the server.",
    });
  }

  try {
    const forwarded = await fetch(plan.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(plan.payload),
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });
    if (!forwarded.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "The digest webhook did not accept the signup. Nothing else was stored.",
        },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach the digest webhook. Nothing was stored." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: "webhook",
    message: "Forwarded to DIGEST_WEBHOOK_URL. This site does not keep a copy.",
  });
}

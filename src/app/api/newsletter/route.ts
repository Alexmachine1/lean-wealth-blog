import { NextResponse } from "next/server";

const FORM_ID = "9637547";

export async function POST(request: Request) {
  const apiSecret = process.env.CONVERTKIT_API_SECRET;
  if (!apiSecret) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const res = await fetch(`https://api.kit.com/v3/forms/${FORM_ID}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_secret: apiSecret, email }),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    const text = await res.text();
    console.error("Kit API error:", res.status, text);
    return NextResponse.json({ error: "Subscription failed" }, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

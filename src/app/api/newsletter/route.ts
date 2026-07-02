import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formId = process.env.CONVERTKIT_FORM_ID;
  if (!formId) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const params = new URLSearchParams({ email_address: email });

    const res = await fetch(`https://app.convertkit.com/forms/${formId}/subscribe`, {
      method: "POST",
      body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (res.ok || res.status === 302) {
      return NextResponse.json({ ok: true });
    }

    const text = await res.text();
    console.error("ConvertKit error:", res.status, text);
    return NextResponse.json({ error: "Subscription failed" }, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formId = process.env.FORMSPREE_ID;
  if (!formId) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  try {
    const formData = await request.formData();

    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: data.error || "Form submission failed" }, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}

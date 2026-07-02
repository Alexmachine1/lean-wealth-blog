import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkAuth } from "@/lib/admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const result = await db.execute({
    sql: "SELECT slug, title, content FROM pages WHERE slug = ?",
    args: [slug],
  });

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const row = result.rows[0] as any;
  return NextResponse.json({
    slug: row.slug,
    title: row.title,
    content: row.content,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const existing = await db.execute({
    sql: "SELECT slug FROM pages WHERE slug = ?",
    args: [slug],
  });
  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const body = await request.json();
  const { title, content } = body;

  await db.execute({
    sql: "UPDATE pages SET title = ?, content = ?, updated_at = datetime('now') WHERE slug = ?",
    args: [title || "", content || "", slug],
  });

  return NextResponse.json({ success: true });
}

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
    sql: "SELECT * FROM posts WHERE slug = ?",
    args: [slug],
  });

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const row = result.rows[0] as any;
  return NextResponse.json({
    frontmatter: {
      title: row.title,
      slug: row.slug,
      date: row.date,
      excerpt: row.excerpt,
      category: row.category,
      tags: JSON.parse(row.tags || "[]"),
      coverImage: row.coverImage,
      author: row.author,
      featured: Boolean(row.featured),
      published: Boolean(row.published),
    },
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
    sql: "SELECT slug FROM posts WHERE slug = ?",
    args: [slug],
  });
  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const body = await request.json();
  const { title, date, excerpt, category, tags, coverImage, author, featured, published, content } = body;

  await db.execute({
    sql: `UPDATE posts SET title = ?, date = ?, excerpt = ?, category = ?, tags = ?, coverImage = ?, author = ?, featured = ?, published = ?, content = ?, updated_at = datetime('now')
          WHERE slug = ?`,
    args: [
      title || "",
      date || new Date().toISOString().split("T")[0],
      excerpt || "",
      category || "uncategorized",
      JSON.stringify(tags || []),
      coverImage || "/images/og-default.jpg",
      author || "Lean Wealth Team",
      featured ? 1 : 0,
      published !== false ? 1 : 0,
      content || "",
      slug,
    ],
  });

  return NextResponse.json({ success: true, slug });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const existing = await db.execute({
    sql: "SELECT slug FROM posts WHERE slug = ?",
    args: [slug],
  });
  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await db.execute({
    sql: "DELETE FROM posts WHERE slug = ?",
    args: [slug],
  });

  return NextResponse.json({ success: true });
}

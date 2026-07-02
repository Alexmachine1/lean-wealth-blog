import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkAuth } from "@/lib/admin";

interface PostRow {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string;
  coverImage: string;
  author: string;
  featured: number;
  published: number;
}

export async function GET() {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await db.execute(
    "SELECT slug, title, date, excerpt, category, tags, coverImage, author, featured, published FROM posts ORDER BY date DESC"
  );

  const posts = result.rows.map((row) => {
    const r = row as unknown as PostRow;
    return {
      title: r.title,
      slug: r.slug,
      date: r.date,
      category: r.category,
      published: Boolean(r.published),
      featured: Boolean(r.featured),
    };
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, slug, date, excerpt, category, tags, coverImage, author, featured, published, content } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
  }

  const existing = await db.execute({
    sql: "SELECT slug FROM posts WHERE slug = ?",
    args: [slug],
  });
  if (existing.rows.length > 0) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  await db.execute({
    sql: `INSERT INTO posts (slug, title, date, excerpt, category, tags, coverImage, author, featured, published, content)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      slug,
      title,
      date || new Date().toISOString().split("T")[0],
      excerpt || "",
      category || "uncategorized",
      JSON.stringify(tags || []),
      coverImage || "/images/og-default.jpg",
      author || "Lean Wealth Team",
      featured ? 1 : 0,
      published !== false ? 1 : 0,
      content,
    ],
  });

  return NextResponse.json({ success: true, slug }, { status: 201 });
}

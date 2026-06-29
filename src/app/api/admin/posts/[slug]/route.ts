import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { checkAuth } from "@/lib/admin";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return NextResponse.json({ frontmatter: data, content });
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
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const body = await request.json();
  const { title, date, excerpt, category, tags, coverImage, author, featured, published, content } = body;

  const frontmatter = {
    title: title || "",
    slug,
    date: date || new Date().toISOString().split("T")[0],
    excerpt: excerpt || "",
    category: category || "uncategorized",
    tags: tags || [],
    coverImage: coverImage || "/images/og-default.jpg",
    author: author || "Lean Wealth Team",
    featured: featured ?? false,
    published: published ?? true,
  };

  const fileContent = matter.stringify(content || "", frontmatter);
  fs.writeFileSync(filePath, fileContent, "utf8");

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
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  fs.unlinkSync(filePath);

  return NextResponse.json({ success: true });
}

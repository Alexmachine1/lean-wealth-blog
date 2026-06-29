import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { checkAuth } from "@/lib/admin";

const postsDirectory = path.join(process.cwd(), "content", "posts");

interface PostData {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  featured: boolean;
  published: boolean;
  slug: string;
}

function ensureDir() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

function readAllPosts(): PostData[] {
  ensureDir();
  const slugs = fs.readdirSync(postsDirectory);
  return slugs.map((slug) => {
    const filePath = path.join(postsDirectory, slug);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    return { ...(data as PostData), slug: slug.replace(/\.mdx$/, "") };
  });
}

export async function GET() {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = readAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  ensureDir();

  const body = await request.json();
  const { title, slug, date, excerpt, category, tags, coverImage, author, featured, published, content } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
  }

  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  const frontmatter = {
    title,
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

  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent, "utf8");

  return NextResponse.json({ success: true, slug }, { status: 201 });
}

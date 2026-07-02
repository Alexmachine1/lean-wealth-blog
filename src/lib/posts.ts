import { db } from "@/lib/db";
import readingTime from "reading-time";

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  featured: boolean;
  published: boolean;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}

interface DbRow {
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
  content: string;
}

function rowToPost(row: DbRow): Post {
  const time = readingTime(row.content);
  return {
    frontmatter: {
      title: row.title,
      slug: row.slug,
      date: row.date,
      excerpt: row.excerpt || "",
      category: row.category || "uncategorized",
      tags: JSON.parse(row.tags || "[]"),
      coverImage: row.coverImage || "",
      author: row.author || "Lean Wealth Team",
      featured: Boolean(row.featured),
      published: Boolean(row.published),
    },
    content: row.content,
    readingTime: Math.ceil(time.minutes),
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE slug = ?",
    args: [slug],
  });
  if (result.rows.length === 0) return null;
  return rowToPost(result.rows[0] as unknown as DbRow);
}

export async function getAllPosts(): Promise<Post[]> {
  const result = await db.execute(
    "SELECT * FROM posts WHERE published = 1 ORDER BY date DESC"
  );
  return result.rows.map((row) => rowToPost(row as unknown as DbRow));
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const result = await db.execute(
    "SELECT * FROM posts WHERE published = 1 AND featured = 1 ORDER BY date DESC"
  );
  return result.rows.map((row) => rowToPost(row as unknown as DbRow));
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE published = 1 AND category = ? ORDER BY date DESC",
    args: [category],
  });
  return result.rows.map((row) => rowToPost(row as unknown as DbRow));
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3
): Promise<Post[]> {
  const current = await getPostBySlug(currentSlug);
  if (!current) return [];

  const all = await getAllPosts();
  const others = all.filter((p) => p.frontmatter.slug !== currentSlug);

  const related = others
    .map((post) => {
      let score = 0;
      if (post.frontmatter.category === current.frontmatter.category) score += 3;
      const commonTags = post.frontmatter.tags.filter((t) =>
        current.frontmatter.tags.includes(t)
      );
      score += commonTags.length;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
}

export async function getAllCategories(): Promise<
  { category: string; count: number }[]
> {
  const result = await db.execute(
    "SELECT category, COUNT(*) as count FROM posts WHERE published = 1 GROUP BY category"
  );
  return result.rows.map((row: any) => ({
    category: row.category as string,
    count: row.count as number,
  }));
}

export async function searchPosts(query: string): Promise<Post[]> {
  const pattern = `%${query}%`;
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE published = 1 AND (title LIKE ? OR excerpt LIKE ?)",
    args: [pattern, pattern],
  });
  return result.rows.map((row) => rowToPost(row as unknown as DbRow));
}

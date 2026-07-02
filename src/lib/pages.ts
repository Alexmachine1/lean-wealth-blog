import { db } from "@/lib/db";

export interface Page {
  slug: string;
  title: string;
  content: string;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const result = await db.execute({
    sql: "SELECT slug, title, content FROM pages WHERE slug = ?",
    args: [slug],
  });
  if (result.rows.length === 0) return null;
  const row = result.rows[0] as any;
  return { slug: row.slug, title: row.title, content: row.content };
}

export async function getAllPages(): Promise<Page[]> {
  const result = await db.execute(
    "SELECT slug, title, content FROM pages ORDER BY slug"
  );
  return result.rows.map((row: any) => ({
    slug: row.slug,
    title: row.title,
    content: row.content,
  }));
}

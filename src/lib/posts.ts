import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content", "posts");

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

function getSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const time = readingTime(content);

  return {
    frontmatter: {
      title: data.title,
      slug: data.slug || slug,
      date: data.date,
      excerpt: data.excerpt || "",
      category: data.category || "uncategorized",
      tags: data.tags || [],
      coverImage: data.coverImage || "",
      author: data.author || "Lean Wealth Team",
      featured: data.featured || false,
      published: data.published ?? true,
    },
    content,
    readingTime: Math.ceil(time.minutes),
  };
}

export function getAllPosts(): Post[] {
  const slugs = getSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx$/, "")))
    .filter((post): post is Post => post !== null && post.frontmatter.published)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.frontmatter.featured);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.frontmatter.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.frontmatter.slug !== currentSlug);

  const related = all
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

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    const cat = post.frontmatter.category;
    counts[cat] = (counts[cat] || 0) + 1;
  });

  return Object.entries(counts).map(([category, count]) => ({
    category,
    count,
  }));
}

export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (post) =>
      post.frontmatter.title.toLowerCase().includes(q) ||
      post.frontmatter.excerpt.toLowerCase().includes(q) ||
      post.frontmatter.tags.some((t) => t.toLowerCase().includes(q))
  );
}

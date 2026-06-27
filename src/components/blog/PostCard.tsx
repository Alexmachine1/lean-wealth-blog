import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: Post }) {
  const { frontmatter } = post;

  return (
    <article className="group rounded-xl border border-border bg-surface transition-all hover:shadow-md">
      <Link href={`/blog/${frontmatter.slug}`} className="block p-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-primary-light/20 px-2.5 py-0.5 font-medium text-primary-dark capitalize">
            {frontmatter.category.replace(/-/g, " ")}
          </span>
          <span>&middot;</span>
          <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          <span>&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {frontmatter.title}
        </h3>

        {frontmatter.excerpt && (
          <p className="mt-2 text-sm text-muted line-clamp-2">
            {frontmatter.excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}

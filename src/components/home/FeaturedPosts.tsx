import Link from "next/link";
import { type Post } from "@/lib/posts";
import PostCard from "@/components/blog/PostCard";

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Latest Posts</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.frontmatter.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

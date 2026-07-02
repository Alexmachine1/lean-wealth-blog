import { getRelatedPosts } from "@/lib/posts";
import PostCard from "@/components/blog/PostCard";

export default async function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const posts = await getRelatedPosts(currentSlug, 3);
  if (posts.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground">You Might Also Like</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.frontmatter.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

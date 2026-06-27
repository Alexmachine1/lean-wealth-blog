import type { Metadata } from "next";
import { getAllPosts, searchPosts, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/blog/PostCard";
import SearchBar from "@/components/blog/SearchBar";
import CategoryFilter from "@/components/blog/CategoryFilter";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical personal finance advice for women. Budgeting, saving, side hustles, and frugal living tips that actually work.",
};

const POSTS_PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";
  const currentPage = Number(params.page) || 1;

  let posts = getAllPosts();

  if (query) {
    posts = searchPosts(query);
  } else if (category) {
    posts = getPostsByCategory(category);
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-foreground">Blog</h1>
        <p className="mt-2 text-muted">
          Real talk about money. No fluff, just what works.
        </p>

        <div className="mt-8 space-y-4">
          <SearchBar />
          <CategoryFilter />
        </div>

        {paginatedPosts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <PostCard key={post.frontmatter.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-muted">
              No posts found{query ? ` for "${query}"` : ""}.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const sp = new URLSearchParams();
              if (query) sp.set("q", query);
              if (category) sp.set("category", category);
              if (page > 1) sp.set("page", String(page));
              const href = sp.toString() ? `/blog?${sp.toString()}` : "/blog";

              return (
                <a
                  key={page}
                  href={href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "bg-surface-alt text-muted hover:bg-border"
                  }`}
                >
                  {page}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

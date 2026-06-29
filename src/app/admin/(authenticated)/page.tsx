"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  title: string;
  slug: string;
  date: string;
  category: string;
  published: boolean;
  featured: boolean;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this post permanently?")) return;

    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch {
      alert("Failed to delete post");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
        >
          New Post
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 text-muted">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="mt-8 text-muted">No posts yet. Create your first one!</p>
      ) : (
        <div className="mt-6 space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex items-center justify-between rounded-lg border border-border bg-surface p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-foreground">
                    {post.title}
                  </h3>
                  {!post.published && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                      Draft
                    </span>
                  )}
                  {post.featured && (
                    <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-medium text-primary-dark">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted">
                  {post.date} &middot; {post.category}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <Link
                  href={`/admin/posts/${post.slug}/edit`}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

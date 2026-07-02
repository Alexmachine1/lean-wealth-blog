"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import MarkdownEditor from "@/components/ui/MarkdownEditor";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    date: "",
    excerpt: "",
    category: "budgeting",
    tags: "",
    coverImage: "/images/og-default.jpg",
    author: "Lean Wealth Team",
    featured: false,
    published: true,
    content: "",
  });

  useEffect(() => {
    fetch(`/api/admin/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.frontmatter.title || "",
          date: data.frontmatter.date || "",
          excerpt: data.frontmatter.excerpt || "",
          category: data.frontmatter.category || "budgeting",
          tags: (data.frontmatter.tags || []).join(", "),
          coverImage: data.frontmatter.coverImage || "/images/og-default.jpg",
          author: data.frontmatter.author || "Lean Wealth Team",
          featured: data.frontmatter.featured ?? false,
          published: data.frontmatter.published ?? true,
          content: data.content || "",
        });
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update post");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center bg-[#f0f0f1]">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#f0f0f1]">
      <form onSubmit={handleSubmit}>
        <div className="sticky top-[57px] z-40 border-b border-border bg-white px-4 py-3">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">
              Edit Post
            </h1>
            <div className="flex items-center gap-3">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <a
                href="/admin"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <div className="min-w-0 flex-1 space-y-5">
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Add title"
                required
                className="block w-full border-0 border-b-2 border-transparent bg-white px-4 py-3 text-2xl font-bold text-foreground placeholder:text-muted/50 outline-none focus:border-primary focus:ring-0"
              />

              <div className="rounded-xl border border-border bg-white p-1">
                <MarkdownEditor
                  value={form.content}
                  onChange={(val) =>
                    setForm((prev) => ({ ...prev, content: val || "" }))
                  }
                  height={500}
                />
              </div>
            </div>

            <div className="w-full shrink-0 space-y-4 lg:w-72">
              <div className="rounded-xl border border-border bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Publish
                </h3>
                <div className="mt-3 space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          published: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">Published</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          featured: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">Featured</span>
                  </label>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Post Settings
                </h3>
                <div className="mt-3 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, date: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, tags: e.target.value }))
                      }
                      placeholder="budgeting, money, savings"
                      className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted">
                      Author
                    </label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, author: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Cover Image
                </h3>
                <div className="mt-3">
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        coverImage: e.target.value,
                      }))
                    }
                    placeholder="Image URL"
                    className="block w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  {form.coverImage && (
                    <img
                      src={form.coverImage}
                      alt=""
                      className="mt-2 h-24 w-full rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Excerpt
                </h3>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  rows={3}
                  placeholder="Write a short excerpt for your post..."
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

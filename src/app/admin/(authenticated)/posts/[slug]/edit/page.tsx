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
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Post</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
            rows={2}
            className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="budgeting, money, savings"
              className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">
            Cover Image URL
          </label>
          <input
            type="text"
            value={form.coverImage}
            onChange={(e) => setForm((prev) => ({ ...prev, coverImage: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-foreground">Featured</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-foreground">Published</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Content
          </label>
          <MarkdownEditor
            value={form.content}
            onChange={(val) => setForm((prev) => ({ ...prev, content: val || "" }))}
            height={500}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark disabled:opacity-50"
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
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import MarkdownEditor from "@/components/ui/MarkdownEditor";

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/api/admin/pages/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setContent(data.content || "");
      })
      .catch(() => setError("Failed to load page"))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save page");
        return;
      }

      router.push("/admin/pages");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center bg-background">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-background">
      <form onSubmit={handleSubmit}>
        <div className="sticky top-[57px] z-40 border-b border-border bg-surface px-4 py-3">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">
              Edit Page
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted">/{slug}</p>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <a
                href="/admin/pages"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="space-y-5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title"
              required
              className="block w-full border-0 border-b-2 border-transparent bg-surface px-4 py-3 text-2xl font-bold text-foreground placeholder:text-muted/50 outline-none focus:border-primary focus:ring-0"
            />

            <div className="rounded-xl border border-border bg-surface p-1">
              <MarkdownEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height={600}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

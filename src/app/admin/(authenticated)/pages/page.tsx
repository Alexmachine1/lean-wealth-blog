"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Page {
  slug: string;
  title: string;
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((data) => setPages(data.pages || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">Pages</h1>

      {loading ? (
        <p className="mt-8 text-muted">Loading...</p>
      ) : (
        <div className="mt-6 space-y-3">
          {pages.map((page) => (
            <div
              key={page.slug}
              className="flex items-center justify-between rounded-lg border border-border bg-surface p-4"
            >
              <div>
                <h3 className="font-semibold text-foreground">{page.title}</h3>
                <p className="text-sm text-muted">/{page.slug}</p>
              </div>
              <Link
                href={`/admin/pages/${page.slug}/edit`}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

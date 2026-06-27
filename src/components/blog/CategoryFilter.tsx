"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          !active
            ? "bg-primary text-white"
            : "bg-surface-alt text-muted hover:bg-border"
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={`/blog?category=${cat.slug}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "bg-surface-alt text-muted hover:bg-border"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";

const platforms = [
  {
    name: "Facebook",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "X",
    getUrl: (url: string) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Pinterest",
    getUrl: (url: string) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    getUrl: (url: string) =>
      `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    name: "Email",
    getUrl: (url: string) =>
      `mailto:?body=${encodeURIComponent(url)}`,
  },
];

export default function SocialShare({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/blog/${slug}`
    : "";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">Share:</span>
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.getUrl(url)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-muted hover:bg-surface-alt hover:text-foreground transition-colors"
          aria-label={`Share on ${p.name}`}
        >
          <span className="text-xs font-medium">{p.name}</span>
        </a>
      ))}
      <button
        onClick={copyLink}
        className="rounded-lg p-2 text-muted hover:bg-surface-alt hover:text-foreground transition-colors text-xs font-medium"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}

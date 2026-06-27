"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3")).map(
      (el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      })
    );
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    elements.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="rounded-xl border border-border bg-surface p-4">
      <h3 className="text-sm font-semibold text-foreground">On this page</h3>
      <ul className="mt-3 space-y-2">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1rem" : 0 }}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  history.pushState(null, "", `#${h.id}`);
                }
              }}
              className={`block text-sm transition-colors ${
                activeId === h.id
                  ? "font-medium text-primary"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

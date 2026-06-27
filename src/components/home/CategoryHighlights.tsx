import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

const icons: Record<string, string> = {
  budgeting: "\u{1F4B0}",
  "frugal-living": "\u{1F331}",
  "debt-payoff": "\u{1F4AA}",
  "saving-investing": "\u{1F4C8}",
  deals: "\u{1F6D2}",
  "side-hustles": "\u{1F4BC}",
};

export default function CategoryHighlights() {
  return (
    <section className="bg-primary/5 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-foreground">
          Explore by Topic
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <span className="text-2xl">{icons[cat.slug] || "\u{1F4DA}"}</span>
              <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="from-primary/5 relative overflow-hidden bg-linear-to-br to-transparent px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {SITE.tagline}
        </h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">
          Real strategies for real women. No jargon. No shame. Just practical
          steps to take control of your money and build a life you love.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/blog"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-dark hover:shadow-md"
          >
            Start Saving Today
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-surface-alt"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

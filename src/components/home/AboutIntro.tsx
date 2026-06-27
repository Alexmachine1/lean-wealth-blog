import Link from "next/link";

export default function AboutIntro() {
  return (
    <section className="border-y border-border bg-surface-alt px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Hey, we are Lean Wealth.
        </h2>
        <p className="mt-4 text-muted leading-relaxed">
          We are women who have been where you are. Juggling bills, wondering
          where the money went, and feeling like financial freedom was something
          other people got to have. So we built this space to share what
          actually works. No get-rich-quick schemes. no jargon. just honest
          strategies that help you keep more of what you earn and build a
          future that feels solid.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-block text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          Read our full story &rarr;
        </Link>
      </div>
    </section>
  );
}

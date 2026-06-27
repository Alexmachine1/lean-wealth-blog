import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `${SITE.name} Affiliate Disclosure. How affiliate links work and how we keep the blog running.`,
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Affiliate Disclosure
        </h1>

        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <section>
            <p className="mt-3">
              This site contains affiliate links. If you click on one of these
              links and make a purchase, we may earn a small commission at no
              extra cost to you. We only recommend products and services we
              have personally used and genuinely believe in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              What This Means for You
            </h2>
            <p className="mt-3">
              When you see a link on {SITE.name}, assume it is an affiliate
              link unless stated otherwise. The price you pay does not change.
              The commission helps us cover the cost of running this blog and
              creating free content for you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Our Commitment
            </h2>
            <p className="mt-3">
              We will never recommend something just because it pays a
              commission. Every product or service we feature is something we
              have tested, used, and found genuinely helpful. Our opinions are
              our own, and we prioritize your trust over any affiliate payout.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              FTC Compliance
            </h2>
            <p className="mt-3">
              In accordance with FTC guidelines, we disclose affiliate
              relationships clearly within blog posts and on this page. If you
              have any questions about our affiliate partnerships, please reach
              out at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-primary hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

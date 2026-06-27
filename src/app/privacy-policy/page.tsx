import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${SITE.name} Privacy Policy. How we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  const updated = "January 1, 2026";

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>

        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Information We Collect
            </h2>
            <p className="mt-3">
              When you visit {SITE.name}, we may collect information you
              voluntarily provide, such as your name and email address when
              you sign up for our newsletter or submit a contact form. We also
              collect basic analytics data like page views and referral
              sources through Vercel Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              How We Use Your Information
            </h2>
            <p className="mt-3">
              We use your information to send you the newsletter you signed up
              for, respond to your inquiries, and improve the content on this
              site. We do not sell your personal information to anyone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
            <p className="mt-3">
              This site uses minimal cookies for analytics and essential
              functionality. We use Vercel Analytics, which is privacy-friendly
              and does not track you across other sites. You can control cookie
              preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Third-Party Services
            </h2>
            <p className="mt-3">
              We use the following third-party services on this site:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Vercel Analytics (website analytics)</li>
              <li>ConvertKit (email newsletter)</li>
              <li>Giscus (comments via GitHub Discussions)</li>
              <li>Formspree (contact form)</li>
              <li>Affiliate networks (monetization)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Your Rights
            </h2>
            <p className="mt-3">
              You have the right to access, correct, or delete any personal
              data we hold about you. You can unsubscribe from our emails at
              any time. To exercise any of these rights, contact us at{" "}
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

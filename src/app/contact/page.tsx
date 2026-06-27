import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name}. Send us a message or follow us on social media.`,
};

export default function ContactPage() {
  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-2 text-muted">
          Have a question, suggestion, or just want to say hi? We would love to
          hear from you.
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
          <ContactForm />

          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-surface-alt p-6">
              <h2 className="font-semibold text-foreground">Email</h2>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block text-sm text-primary hover:underline"
              >
                {SITE.email}
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface-alt p-6">
              <h2 className="font-semibold text-foreground">Social</h2>
              <div className="mt-2 space-y-1">
                <a
                  href="https://pinterest.com/leanwealth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  Pinterest
                </a>
                <a
                  href="https://instagram.com/leanwealth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  Instagram
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-primary">{SITE.name}</h3>
            <p className="mt-2 text-sm text-muted">{SITE.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Follow Along</h4>
            <div className="mt-3 flex gap-3">
              <a
                href={SOCIAL_LINKS.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                Pinterest
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          &copy; {year} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

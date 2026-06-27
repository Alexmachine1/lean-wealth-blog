export const SITE = {
  name: "Lean Wealth",
  tagline: "Build wealth without wasting. Smart money moves for women who want more.",
  description: "A personal finance blog for women ready to take control of their money. Practical budgeting tips, frugal living strategies, debt payoff plans, and side hustle ideas.",
  url: "https://leanwealthblog.com",
  author: "Lean Wealth Team",
  email: "hello@leanwealthblog.com",
  since: 2026,
  locale: "en-US",
  ogImage: "/images/og-default.jpg",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const CATEGORIES = [
  { slug: "budgeting", label: "Budgeting & Money Management" },
  { slug: "frugal-living", label: "Frugal Living Tips" },
  { slug: "debt-payoff", label: "Debt Payoff Strategies" },
  { slug: "saving-investing", label: "Saving & Investing Basics" },
  { slug: "deals", label: "Deals, Coupons & Cashback" },
  { slug: "side-hustles", label: "Side Hustles & Extra Income" },
] as const;

export const SOCIAL_LINKS = {
  pinterest: "https://pinterest.com/leanwealth",
  instagram: "https://instagram.com/leanwealth",
} as const;

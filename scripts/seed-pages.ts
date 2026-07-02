import fs from "fs";
import path from "path";

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env.local not found.");
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

const pages = [
  {
    slug: "about",
    title: "About Lean Wealth",
    content: `Our Story

Lean Wealth started the way most good things do. Over coffee, between two women who were tired of feeling like money was something that happened to them instead of something they controlled.

We had both been through it. The paycheck-to-paycheck cycle. The debt that felt permanent. The sinking feeling when an unexpected expense showed up and there was nothing to catch it with. And we were tired of being told the answer was just "make a budget" like that was some kind of revelation we had never considered.

So we started sharing what actually worked for us. Not the theory. The messy, imperfect, real-life strategies that helped us dig out, build up, and breathe easier. And other women started resonating with it. Because it was real.

What We Cover

Budgeting that does not make you want to cry. Frugal living that feels like a choice, not a punishment. Debt payoff strategies that account for the fact that you still need to live your life. Investing explained like you are a smart adult (because you are). And side hustles with real numbers attached, not vague promises.

We also hunt down deals and cashback opportunities because leaving money on the table is uninteresting to us.

Who This Is For

You, if you have ever Googled "how to save money" at 11pm. You, if you are tired of financial advice that assumes you have a finance degree or a six-figure salary. You, if you know you deserve to feel secure about money but are not sure how to get there from where you are right now.

Our Promise

We will never talk down to you. We will never make you feel bad about where you are. We will never recommend something we have not tried ourselves. And we will always, always give you real numbers.`,
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: `Information We Collect

When you visit Lean Wealth, we may collect information you voluntarily provide, such as your name and email address when you sign up for our newsletter or submit a contact form. We also collect basic analytics data like page views and referral sources through Vercel Analytics.

How We Use Your Information

We use your information to send you the newsletter you signed up for, respond to your inquiries, and improve the content on this site. We do not sell your personal information to anyone.

Cookies

This site uses minimal cookies for analytics and essential functionality. We use Vercel Analytics, which is privacy-friendly and does not track you across other sites. You can control cookie preferences through your browser settings.

Third-Party Services

We use the following third-party services on this site:

- Vercel Analytics (website analytics)
- ConvertKit (email newsletter)
- Giscus (comments via GitHub Discussions)
- Formspree (contact form)
- Affiliate networks (monetization)

Your Rights

You have the right to access, correct, or delete any personal data we hold about you. You can unsubscribe from our emails at any time. To exercise any of these rights, contact us at hello@leanwealthblog.com.`,
  },
  {
    slug: "affiliate-disclosure",
    title: "Affiliate Disclosure",
    content: `This site contains affiliate links. If you click on one of these links and make a purchase, we may earn a small commission at no extra cost to you. We only recommend products and services we have personally used and genuinely believe in.

What This Means for You

When you see a link on Lean Wealth, assume it is an affiliate link unless stated otherwise. The price you pay does not change. The commission helps us cover the cost of running this blog and creating free content for you.

Our Commitment

We will never recommend something just because it pays a commission. Every product or service we feature is something we have tested, used, and found genuinely helpful. Our opinions are our own, and we prioritize your trust over any affiliate payout.

FTC Compliance

In accordance with FTC guidelines, we disclose affiliate relationships clearly within blog posts and on this page. If you have any questions about our affiliate partnerships, please reach out at hello@leanwealthblog.com.`,
  },
];

async function main() {
  loadEnv();

  const { createClient } = await import("@libsql/client");

  const db = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  });

  console.log("✅ Connected to Turso");

  const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS pages (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  updated_at TEXT DEFAULT (datetime('now'))
);
`;

  await db.execute(CREATE_TABLE_SQL);
  console.log("✅ Pages table ready");

  for (const page of pages) {
    const existing = await db.execute({
      sql: "SELECT slug FROM pages WHERE slug = ?",
      args: [page.slug],
    });

    if (existing.rows.length > 0) {
      await db.execute({
        sql: "UPDATE pages SET title = ?, content = ?, updated_at = datetime('now') WHERE slug = ?",
        args: [page.title, page.content, page.slug],
      });
      console.log(`  ✅ Updated "${page.slug}"`);
    } else {
      await db.execute({
        sql: "INSERT INTO pages (slug, title, content) VALUES (?, ?, ?)",
        args: [page.slug, page.title, page.content],
      });
      console.log(`  ✅ Created "${page.slug}"`);
    }
  }

  console.log("🎉 Pages seeded!");
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});

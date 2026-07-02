import fs from "fs";
import path from "path";
import matter from "gray-matter";

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env.local not found. Create it with TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.");
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

async function main() {
  loadEnv();

  const { createClient } = await import("@libsql/client");

  const db = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  console.log("✅ Connected to Turso");

  const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  category TEXT DEFAULT 'uncategorized',
  tags TEXT DEFAULT '[]',
  coverImage TEXT DEFAULT '/images/og-default.jpg',
  author TEXT DEFAULT 'Lean Wealth Team',
  featured INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
`;

  await db.execute(CREATE_TABLE_SQL);
  console.log("✅ Table created");

  const postsDir = path.join(process.cwd(), "content", "posts");
  if (!fs.existsSync(postsDir)) {
    console.log("📂 No content/posts/ directory found. Nothing to migrate.");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  console.log(`📄 Found ${files.length} post(s) to migrate`);

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    const slug = data.slug || file.replace(/\.mdx$/, "");

    const existing = await db.execute({
      sql: "SELECT slug FROM posts WHERE slug = ?",
      args: [slug],
    });
    if (existing.rows.length > 0) {
      console.log(`  ⏭ Skipping "${slug}" (already exists)`);
      continue;
    }

    await db.execute({
      sql: `INSERT INTO posts (slug, title, date, excerpt, category, tags, coverImage, author, featured, published, content)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        slug,
        data.title || "",
        data.date || new Date().toISOString().split("T")[0],
        data.excerpt || "",
        data.category || "uncategorized",
        JSON.stringify(data.tags || []),
        data.coverImage || "/images/og-default.jpg",
        data.author || "Lean Wealth Team",
        data.featured ? 1 : 0,
        data.published !== false ? 1 : 0,
        content,
      ],
    });

    console.log(`  ✅ Migrated "${slug}"`);
  }

  console.log("🎉 Migration complete!");
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});

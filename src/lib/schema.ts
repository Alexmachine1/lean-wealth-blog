export const CREATE_TABLES_SQL = `
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

CREATE TABLE IF NOT EXISTS pages (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  updated_at TEXT DEFAULT (datetime('now'))
);
`;

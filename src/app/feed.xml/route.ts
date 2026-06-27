import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${SITE.url}/blog/${post.frontmatter.slug}</link>
      <guid>${SITE.url}/blog/${post.frontmatter.slug}</guid>
      <description><![CDATA[${post.frontmatter.excerpt}]]></description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <category>${post.frontmatter.category}</category>
    </item>
  `
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>${SITE.locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

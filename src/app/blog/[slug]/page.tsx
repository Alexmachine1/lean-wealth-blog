import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import MdxContent from "@/components/blog/MdxContent";
import TableOfContents from "@/components/blog/TableOfContents";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import SocialShare from "@/components/blog/SocialShare";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedPosts from "@/components/blog/RelatedPosts";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter } = post;

  return (
    <>
      <ReadingProgressBar />

      <article className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <header>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="rounded-full bg-primary-light/20 px-3 py-0.5 font-medium text-primary-dark capitalize">
                {frontmatter.category.replace(/-/g, " ")}
              </span>
              <span>&middot;</span>
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
              <span>&middot;</span>
              <span>{post.readingTime} min read</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {frontmatter.title}
            </h1>

            {frontmatter.excerpt && (
              <p className="mt-4 text-lg text-muted leading-relaxed">
                {frontmatter.excerpt}
              </p>
            )}

            {frontmatter.coverImage && (
              <div className="mt-6 aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  src={frontmatter.coverImage}
                  alt={frontmatter.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-6">
              <SocialShare title={frontmatter.title} slug={frontmatter.slug} />
            </div>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_200px]">
            <MdxContent source={post.content} />
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>
          </div>

          <hr className="my-12 border-border" />

          <AuthorBio author={frontmatter.author} />

          <div className="mt-12">
            <RelatedPosts currentSlug={frontmatter.slug} />
          </div>
        </div>
      </article>
    </>
  );
}

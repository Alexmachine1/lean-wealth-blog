import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

export default async function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-stone dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeSlug, rehypeHighlight],
          },
        }}
      />
    </div>
  );
}

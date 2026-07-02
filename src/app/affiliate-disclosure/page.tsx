import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getPageBySlug } from "@/lib/pages";
import MdxContent from "@/components/blog/MdxContent";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `${SITE.name} Affiliate Disclosure. How affiliate links work and how we keep the blog running.`,
};

export default async function AffiliateDisclosurePage() {
  const page = await getPageBySlug("affiliate-disclosure");
  if (!page) notFound();

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          {page.title}
        </h1>
        <div className="mt-8">
          <MdxContent source={page.content} />
        </div>
      </div>
    </div>
  );
}

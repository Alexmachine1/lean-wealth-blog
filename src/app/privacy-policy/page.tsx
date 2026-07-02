import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getPageBySlug } from "@/lib/pages";
import MdxContent from "@/components/blog/MdxContent";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${SITE.name} Privacy Policy. How we collect, use, and protect your personal information.`,
};

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug("privacy-policy");
  if (!page) notFound();

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: January 1, 2026</p>
        <div className="mt-8">
          <MdxContent source={page.content} />
        </div>
      </div>
    </div>
  );
}

import Hero from "@/components/home/Hero";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import AboutIntro from "@/components/home/AboutIntro";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
      <CategoryHighlights />
      <AboutIntro />
      <NewsletterSignup />
    </>
  );
}

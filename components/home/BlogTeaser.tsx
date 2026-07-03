import Link from "next/link";
import { getRecentPosts } from "@/lib/blog";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import BlogCard from "@/components/blog/BlogCard";

export default async function BlogTeaser() {
  const posts = await getRecentPosts(3);

  // Hide the section entirely if no posts are published yet.
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        {/* Section header */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <RevealText
              as="p"
              text="From the Blog"
              className="mb-3 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h2"
              text="Insights & Wisdom"
              className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
            />
          </div>
          <Reveal delay={0.08}>
            <Link
              href="/blog"
              className="shrink-0 text-sm font-medium text-copper underline-offset-4 transition-colors duration-200 hover:text-gold-line hover:underline"
            >
              Read All Posts →
            </Link>
          </Reveal>
        </div>

        {/* Cards */}
        <Reveal delay={0.1} className="mt-12">
          <ul
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {posts.map((post) => (
              <li key={post.id}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

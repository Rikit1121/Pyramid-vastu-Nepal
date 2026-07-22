import type { Metadata } from "next";
import { getAllPublishedPosts } from "@/lib/blog";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Insights on Vaastu Shastra, sacred geometry, geopathic stress, and the principles behind a balanced living and working space in Nepal.",
  path: "/blog",
});

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getAllPublishedPosts();

  return (
    <div className="relative min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/background2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-bg-deep/88"
        aria-hidden="true"
      />

    <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8 lg:pb-28">
      {/* Page header */}
      <div className="max-w-2xl">
        <RevealText
          as="p"
          text="Insights & Wisdom"
          className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
        />
        <RevealText
          as="h1"
          text="The Blog"
          className="font-display text-4xl leading-tight tracking-tight text-ivory-text sm:text-5xl"
        />
        <Reveal delay={0.08}>
          <p className="mt-5 text-base leading-relaxed text-ivory-text/65">
            Practical guidance, traditional wisdom, and real insights on Vaastu
            Shastra, sacred geometry, and healing — written from 13+ years of
            practice in Nepal.
          </p>
        </Reveal>
      </div>

      <div className="my-12 border-t border-border-hairline" />

      {posts.length === 0 ? (
        <Reveal>
          <div className="rounded-card border border-border-hairline bg-surface px-6 py-20 text-center">
            <p className="font-display text-2xl tracking-tight text-ivory-text">
              Articles coming soon
            </p>
            <p className="mt-3 text-sm text-ivory-text/55">
              We&rsquo;re preparing our first posts. Check back shortly.
            </p>
          </div>
        </Reveal>
      ) : (
        <Reveal>
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
      )}
    </div>
    </div>
  );
}

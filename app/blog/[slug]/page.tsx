import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedPostBySlug } from "@/lib/blog";
import Reveal from "@/components/shared/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return buildPageMetadata({
      title: "Post Not Found",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt?.slice(0, 155) || post.content.slice(0, 155),
    path: `/blog/${post.slug}`,
    ogImage: post.coverImage,
    type: "article",
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BackArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

/**
 * Renders plain-text or very basic markdown-like content into paragraphs.
 * Splits on blank lines into paragraphs; within each paragraph handles
 * **bold** and *italic* inline markers. No external markdown library needed.
 */
function renderContent(content: string) {
  const paragraphs = content.split(/\n{2,}/).filter(Boolean);

  return paragraphs.map((para, i) => {
    // Heading: lines starting with ## or ###
    const headingMatch = para.match(/^(#{2,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      if (level === 2) {
        return (
          <h2
            key={i}
            className="mt-10 mb-4 font-display text-2xl tracking-tight text-ivory-text"
          >
            {text}
          </h2>
        );
      }
      return (
        <h3
          key={i}
          className="mt-8 mb-3 font-display text-xl tracking-tight text-ivory-text"
        >
          {text}
        </h3>
      );
    }

    // Regular paragraph — inline bold/italic
    const parts = para.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    const inline = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="font-semibold text-ivory-text/90">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={j} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });

    return (
      <p key={i} className="mt-5 text-base leading-[1.8] text-ivory-text/75 first:mt-0">
        {inline}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="relative min-h-screen">
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
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

    <article className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24 lg:px-8 lg:pb-28">
      {/* Back link */}
      <Reveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-ivory-text/50 transition-colors duration-200 hover:text-ivory-text"
        >
          <BackArrow />
          All Posts
        </Link>
      </Reveal>

      {/* Meta */}
      <Reveal delay={0.05} className="mt-10">
        <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold-line">
          {formatDate(post.createdAt)}
        </p>
        <h1 className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-5 text-lg leading-relaxed text-ivory-text/60">
            {post.excerpt}
          </p>
        )}
      </Reveal>

      {/* Cover image — sharp 0px frame */}
      {post.coverImage && (
        <Reveal delay={0.08} className="mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full object-cover"
            style={{ aspectRatio: "16 / 9" }}
            loading="eager"
          />
        </Reveal>
      )}

      {/* Divider */}
      <div className="my-10 border-t border-border-hairline" />

      {/* Content */}
      <Reveal delay={0.1}>
        <div>{renderContent(post.content)}</div>
      </Reveal>

      {/* Footer nav */}
      <div className="mt-16 border-t border-border-hairline pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-ivory-text/50 transition-colors duration-200 hover:text-ivory-text"
        >
          <BackArrow />
          Back to all posts
        </Link>
      </div>
    </article>
    </div>
  );
}

import Link from "next/link";
import type { BlogPost } from "@/types";

type BlogCardProps = {
  post: BlogPost;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border-hairline bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-gold-line/40 hover:shadow-glow-gold"
    >
      {/* Cover image — sharp 0px frame per design.md */}
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="aspect-[16/9] w-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-surface to-bg-deep">
          <svg
            width="48"
            height="48"
            viewBox="0 0 120 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gold-line/20"
            aria-hidden="true"
          >
            <circle cx="60" cy="60" r="30" />
            <circle cx="60" cy="30" r="30" />
            <circle cx="60" cy="90" r="30" />
            <circle cx="34" cy="45" r="30" />
            <circle cx="86" cy="45" r="30" />
            <circle cx="34" cy="75" r="30" />
            <circle cx="86" cy="75" r="30" />
          </svg>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold-line">
          {formatDate(post.createdAt)}
        </p>
        <h3 className="font-display text-xl leading-tight tracking-tight text-ivory-text">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-text/65 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <span className="mt-5 text-sm font-medium text-copper transition-colors duration-200 group-hover:text-gold-line">
          Read More →
        </span>
      </div>
    </Link>
  );
}

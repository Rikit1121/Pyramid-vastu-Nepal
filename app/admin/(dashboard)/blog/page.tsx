import Link from "next/link";
import { getAllPostsAdmin } from "@/lib/blog";
import DeleteBlogPostButton from "@/components/admin/DeleteBlogPostButton";

export default async function AdminBlogPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ivory-text">
            Blog Posts
          </h1>
          <p className="mt-2 text-sm text-ivory-text/55">
            {posts.length} {posts.length === 1 ? "post" : "posts"} total.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex h-11 items-center justify-center rounded-btn bg-copper px-6 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper"
        >
          New Post
        </Link>
      </div>

      {/* List */}
      {posts.length === 0 ? (
        <div className="mt-10 rounded-card border border-border-hairline bg-surface px-6 py-16 text-center">
          <p className="font-display text-xl text-ivory-text">No posts yet</p>
          <p className="mt-2 text-sm text-ivory-text/55">
            Write your first post to start the blog.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-card border border-border-hairline">
          {/* Table header (desktop) */}
          <div className="hidden grid-cols-[1fr_140px_160px_120px] gap-4 border-b border-border-hairline bg-surface px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-ivory-text/45 sm:grid">
            <span>Title</span>
            <span>Status</span>
            <span>Date</span>
            <span className="text-right">Actions</span>
          </div>

          <ul role="list">
            {posts.map((post) => (
              <li
                key={post.id}
                className="grid grid-cols-1 items-center gap-2 border-b border-border-hairline bg-surface/40 px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_140px_160px_120px] sm:gap-4"
              >
                {/* Title + slug */}
                <div className="min-w-0">
                  <p className="truncate font-medium text-ivory-text">
                    {post.title}
                  </p>
                  <p className="truncate text-xs text-ivory-text/40">
                    /blog/{post.slug}
                  </p>
                </div>

                {/* Status */}
                <span>
                  <span
                    className={[
                      "inline-block rounded-btn px-2.5 py-1 text-[10px] uppercase tracking-[0.15em]",
                      post.published
                        ? "bg-copper/15 text-copper"
                        : "bg-bg-deep text-ivory-text/40",
                    ].join(" ")}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </span>

                {/* Date */}
                <span className="text-xs text-ivory-text/45">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-4 sm:justify-end">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-xs font-medium text-ivory-text/70 transition-colors duration-200 hover:text-copper"
                  >
                    Edit
                  </Link>
                  <DeleteBlogPostButton id={post.id} title={post.title} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

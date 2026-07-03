import { createBlogPost } from "@/app/admin/actions";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight text-ivory-text">
        New Post
      </h1>
      <p className="mt-2 mb-8 text-sm text-ivory-text/55">
        Write and publish a new blog post.
      </p>
      <BlogPostForm mode="new" action={createBlogPost} />
    </div>
  );
}

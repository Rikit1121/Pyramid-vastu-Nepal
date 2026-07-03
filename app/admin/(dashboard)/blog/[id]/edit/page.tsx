import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog";
import { updateBlogPost } from "@/app/admin/actions";
import BlogPostForm from "@/components/admin/BlogPostForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight text-ivory-text">
        Edit Post
      </h1>
      <p className="mt-2 mb-8 text-sm text-ivory-text/55">
        Editing{" "}
        <span className="text-ivory-text/80">&ldquo;{post.title}&rdquo;</span>.
      </p>
      <BlogPostForm mode="edit" action={updateBlogPost} post={post} />
    </div>
  );
}

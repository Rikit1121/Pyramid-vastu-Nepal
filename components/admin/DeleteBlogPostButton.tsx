"use client";

import { deleteBlogPost } from "@/app/admin/actions";

type Props = { id: string; title: string };

export default function DeleteBlogPostButton({ id, title }: Props) {
  return (
    <form
      action={deleteBlogPost}
      onSubmit={(e) => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs font-medium text-ivory-text/45 transition-colors duration-200 hover:text-copper"
      >
        Delete
      </button>
    </form>
  );
}

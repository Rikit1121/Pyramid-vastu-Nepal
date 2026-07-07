"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import type { ActionState } from "@/app/admin/actions";

type BlogPostFormProps = {
  mode: "new" | "edit";
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  post?: BlogPost;
};

const labelClass =
  "mb-1.5 block text-xs uppercase tracking-[0.2em] text-ivory-text/55";
const inputClass =
  "w-full rounded-btn border border-border-hairline bg-bg-deep px-4 py-3 text-sm text-ivory-text placeholder:text-ivory-text/30 transition-colors duration-200 focus:border-copper/60 focus:outline-none";

/** Derive a URL-safe slug from a title string. */
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default function BlogPostForm({ mode, action, post }: BlogPostFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    {},
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    post?.coverImage ?? null,
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <form action={formAction} encType="multipart/form-data" className="flex flex-col gap-6">
      {mode === "edit" && post && (
        <>
          <input type="hidden" name="id" value={post.id} />
          {post.coverImage && (
            <input type="hidden" name="existingCoverImage" value={post.coverImage} />
          )}
        </>
      )}

      {state.error && (
        <div className="rounded-btn border border-copper/40 bg-copper/10 px-4 py-3 text-sm text-ivory-text/80">
          {state.error}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Title <span className="text-copper">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post?.title ?? ""}
          placeholder="What is Vastu Shastra and why does it matter?"
          className={inputClass}
          onChange={(e) => {
            if (mode === "new") {
              const slugInput = document.getElementById("slug") as HTMLInputElement | null;
              if (slugInput && !slugInput.dataset.edited) {
                slugInput.value = titleToSlug(e.target.value);
              }
            }
          }}
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className={labelClass}>
          Slug <span className="text-copper">*</span>
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          title="Lowercase letters, numbers, and hyphens only"
          defaultValue={post?.slug ?? ""}
          placeholder="what-is-vastu-shastra"
          className={inputClass}
          onInput={(e) => {
            (e.target as HTMLInputElement).dataset.edited = "true";
          }}
        />
        <p className="mt-1.5 text-xs text-ivory-text/35">
          /blog/<span className="text-ivory-text/55">slug</span> — auto-filled from title, editable.
        </p>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className={labelClass}>
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt ?? ""}
          placeholder="A short summary shown on the blog index and homepage teaser…"
          className={[inputClass, "resize-none"].join(" ")}
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className={labelClass}>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={16}
          defaultValue={post?.content ?? ""}
          placeholder={"Write your article here. Separate paragraphs with a blank line.\n\nMarkdown syntax is supported for bold (**text**), italics (*text*), and headings (## Heading)."}
          className={[inputClass, "resize-y font-mono text-xs leading-relaxed"].join(" ")}
        />
      </div>

      {/* Cover image upload */}
      <div>
        <label className={labelClass}>Cover Image</label>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Cover preview"
              className="aspect-[4/3] w-full max-w-xs rounded-card border border-border-hairline object-cover"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full max-w-xs items-center justify-center rounded-card border border-border-hairline bg-surface text-xs text-ivory-text/30">
              No cover image
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input
              ref={fileRef}
              type="file"
              name="coverImageFile"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-9 items-center justify-center rounded-btn border border-border-hairline px-4 text-xs font-medium text-ivory-text/70 transition-colors hover:border-gold-line/50 hover:text-ivory-text"
            >
              {previewUrl ? "Replace image" : "Upload image"}
            </button>
            <p className="text-xs text-ivory-text/35">
              JPG, PNG, or WebP. Uploaded to Supabase Storage on save.
            </p>
          </div>
        </div>
      </div>

      {/* Optional external URL fallback */}
      <div>
        <label htmlFor="coverImage" className={labelClass}>
          Or paste image URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="url"
          defaultValue={post?.coverImage ?? ""}
          placeholder="https://…"
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-ivory-text/35">
          Optional. If you upload a file above, the upload takes priority.
        </p>
      </div>

      {/* Published toggle */}
      <div className="flex items-center gap-3 rounded-btn border border-border-hairline bg-bg-deep px-4 py-3">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={post?.published ?? false}
          className="h-4 w-4 accent-copper"
        />
        <label htmlFor="published" className="text-sm text-ivory-text/80">
          Published — visible on the public blog
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-btn bg-copper px-7 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper disabled:opacity-60"
        >
          {pending
            ? mode === "new"
              ? "Creating…"
              : "Saving…"
            : mode === "new"
              ? "Create Post"
              : "Save Changes"}
        </button>
        <Link
          href="/admin/blog"
          className="text-sm text-ivory-text/45 transition-colors duration-200 hover:text-ivory-text"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

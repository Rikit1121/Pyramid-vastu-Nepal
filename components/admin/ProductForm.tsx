"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import type { ActionState } from "@/app/admin/actions";

type ProductFormProps = {
  mode: "new" | "edit";
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  product?: Product;
};

const labelClass =
  "mb-1.5 block text-xs uppercase tracking-[0.2em] text-ivory-text/55";
const inputClass =
  "w-full rounded-btn border border-border-hairline bg-bg-deep px-4 py-3 text-sm text-ivory-text placeholder:text-ivory-text/30 transition-colors duration-200 focus:border-copper/60 focus:outline-none";

export default function ProductForm({ mode, action, product }: ProductFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {mode === "edit" && product && (
        <input type="hidden" name="id" value={product.id} />
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Name <span className="text-copper">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name ?? ""}
          placeholder="Copper Vastu Pyramid"
          className={inputClass}
        />
      </div>

      {/* Slug + Price */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
            defaultValue={product?.slug ?? ""}
            placeholder="copper-vastu-pyramid"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="price" className={labelClass}>
            Price (NPR) <span className="text-copper">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={product?.price ?? ""}
            placeholder="3500"
            className={inputClass}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          placeholder="A precision-crafted pure copper pyramid…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Benefits */}
      <div>
        <label htmlFor="benefits" className={labelClass}>
          Benefits{" "}
          <span className="normal-case tracking-normal text-ivory-text/35">
            (one per line)
          </span>
        </label>
        <textarea
          id="benefits"
          name="benefits"
          rows={4}
          defaultValue={product?.benefits?.join("\n") ?? ""}
          placeholder={"Strengthens the energy field\nBalances the five elements"}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Material + Size */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="material" className={labelClass}>
            Material
          </label>
          <input
            id="material"
            name="material"
            type="text"
            defaultValue={product?.material ?? ""}
            placeholder="Pure copper"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="size" className={labelClass}>
            Size
          </label>
          <input
            id="size"
            name="size"
            type="text"
            defaultValue={product?.size ?? ""}
            placeholder="3 × 3 inches base"
            className={inputClass}
          />
        </div>
      </div>

      {/* In stock */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="inStock"
          defaultChecked={product?.inStock ?? true}
          className="h-4 w-4 accent-[var(--color-copper)]"
        />
        <span className="text-sm text-ivory-text/80">In stock</span>
      </label>

      {/* Existing images (edit only) */}
      {mode === "edit" && product && product.images.length > 0 && (
        <div>
          <p className={labelClass}>Current images</p>
          <p className="mb-3 text-xs text-ivory-text/40">
            Untick an image to remove it on save.
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {product.images.map((url, i) => (
              <label
                key={url}
                className="relative block cursor-pointer overflow-hidden rounded-btn border border-border-hairline"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Image ${i + 1}`}
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute right-1.5 top-1.5 rounded-sm bg-bg-deep/80 px-1.5 py-0.5">
                  <input
                    type="checkbox"
                    name="existingImages"
                    value={url}
                    defaultChecked
                    className="h-3.5 w-3.5 accent-[var(--color-copper)] align-middle"
                  />
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* New images */}
      <div>
        <label htmlFor="images" className={labelClass}>
          {mode === "edit" ? "Add images" : "Images"}
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="block w-full text-sm text-ivory-text/70 file:mr-4 file:rounded-btn file:border-0 file:bg-copper file:px-4 file:py-2 file:text-sm file:font-medium file:text-ivory-text hover:file:shadow-glow-copper"
        />
        <p className="mt-2 text-xs text-ivory-text/40">
          Uploaded to the product-images bucket on save. You can select multiple.
        </p>
      </div>

      {/* Error */}
      {state.error && (
        <p className="rounded-btn border border-copper/40 bg-copper/10 px-3 py-2 text-sm text-ivory-text/80">
          {state.error}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-border-hairline pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-btn bg-copper px-7 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper disabled:opacity-60"
        >
          {pending
            ? "Saving…"
            : mode === "new"
              ? "Create Product"
              : "Save Changes"}
        </button>
        <Link
          href="/admin"
          className="text-sm text-ivory-text/55 transition-colors duration-200 hover:text-ivory-text"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

"use client";

import { deleteProduct } from "@/app/admin/actions";

type DeleteProductButtonProps = {
  id: string;
  name: string;
};

export default function DeleteProductButton({
  id,
  name,
}: DeleteProductButtonProps) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (
          !window.confirm(
            `Delete "${name}"? This removes the product and its images permanently.`,
          )
        ) {
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

"use client";

import { deleteAdvisor } from "@/app/admin/actions";

export default function DeleteAdvisorButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  async function handleDelete() {
    if (!confirm(`Delete advisor "${name}"? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append("id", id);
    await deleteAdvisor(fd);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-xs font-medium text-ivory-text/40 transition-colors duration-200 hover:text-red-400"
    >
      Delete
    </button>
  );
}

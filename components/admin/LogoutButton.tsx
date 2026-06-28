"use client";

import { logout } from "@/app/admin/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="inline-flex h-9 items-center rounded-btn border border-border-hairline px-4 text-xs font-medium text-ivory-text/70 transition-colors duration-200 hover:border-copper hover:text-ivory-text"
      >
        Log out
      </button>
    </form>
  );
}

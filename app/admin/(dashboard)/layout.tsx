import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/supabase-server";
import LogoutButton from "@/components/admin/LogoutButton";

/**
 * Admin shell + server-side auth guard.
 *
 * The proxy already blocks unauthenticated access to /admin before this
 * renders; this is a second, in-app check (defense in depth) and also gives us
 * the user's email for the header. The login page lives OUTSIDE this group
 * (app/admin/login), so there's no redirect loop.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="relative min-h-screen">
      {/* Subtle admin background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/background3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-bg-deep/93"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-24 lg:px-8">
        {/* Admin header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-hairline pb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-line">
              Admin Dashboard
            </p>
            <nav className="mt-2 flex items-center gap-5 text-sm">
              <Link
                href="/admin"
                className="text-ivory-text/70 transition-colors duration-200 hover:text-ivory-text"
              >
                Products
              </Link>
              <Link
                href="/admin/advisors"
                className="text-ivory-text/70 transition-colors duration-200 hover:text-ivory-text"
              >
                Advisors
              </Link>
              <Link
                href="/"
                className="text-ivory-text/70 transition-colors duration-200 hover:text-ivory-text"
              >
                View site
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-ivory-text/40 sm:inline">
              {user.email}
            </span>
            <LogoutButton />
          </div>
        </div>

        <div className="pt-10">{children}</div>
      </div>
    </div>
  );
}

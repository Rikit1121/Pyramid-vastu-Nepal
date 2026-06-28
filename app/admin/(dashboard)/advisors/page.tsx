import Link from "next/link";
import { getAllAdvisors } from "@/lib/advisors";
import DeleteAdvisorButton from "@/components/admin/DeleteAdvisorButton";

export default async function AdminAdvisorsPage() {
  const advisors = await getAllAdvisors();

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ivory-text">
            Advisors
          </h1>
          <p className="mt-2 text-sm text-ivory-text/55">
            {advisors.length}{" "}
            {advisors.length === 1 ? "advisor" : "advisors"} configured.
            The first active advisor is shown on the public site.
          </p>
        </div>
        <Link
          href="/admin/advisors/new"
          className="inline-flex h-11 items-center justify-center rounded-btn bg-copper px-6 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper"
        >
          Add Advisor
        </Link>
      </div>

      {/* List */}
      {advisors.length === 0 ? (
        <div className="mt-10 rounded-card border border-border-hairline bg-surface/60 px-6 py-16 text-center">
          <p className="font-display text-xl text-ivory-text">No advisors yet</p>
          <p className="mt-2 text-sm text-ivory-text/55">
            The static default advisor will be shown on the site until you add
            one here.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-card border border-border-hairline">
          {/* Table header (desktop) */}
          <div className="hidden grid-cols-[72px_1fr_200px_120px_140px] gap-4 border-b border-border-hairline bg-surface px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-ivory-text/45 sm:grid">
            <span>Photo</span>
            <span>Name / Role</span>
            <span>WhatsApp</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          <ul role="list">
            {advisors.map((advisor) => (
              <li
                key={advisor.id}
                className="grid grid-cols-[56px_1fr] items-center gap-4 border-b border-border-hairline bg-surface/40 px-5 py-4 last:border-b-0 sm:grid-cols-[72px_1fr_200px_120px_140px]"
              >
                {/* Photo */}
                <div className="h-14 w-14 overflow-hidden rounded-full border border-border-hairline bg-bg-deep">
                  {advisor.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={advisor.photo}
                      alt={advisor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-ivory-text/20">
                      —
                    </div>
                  )}
                </div>

                {/* Name + role */}
                <div className="min-w-0">
                  <p className="truncate font-medium text-ivory-text">
                    {advisor.name}
                  </p>
                  <p className="truncate text-xs text-ivory-text/45">
                    {advisor.role}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ivory-text/35 sm:hidden">
                    {advisor.whatsappNumber}
                  </p>
                </div>

                {/* WhatsApp (desktop) */}
                <span className="hidden truncate text-sm text-ivory-text/60 sm:block">
                  {advisor.whatsappNumber || "—"}
                </span>

                {/* Active badge */}
                <span className="hidden sm:block">
                  <span
                    className={[
                      "inline-block rounded-btn px-2.5 py-1 text-[10px] uppercase tracking-[0.15em]",
                      "bg-copper/15 text-copper",
                    ].join(" ")}
                  >
                    Active
                  </span>
                </span>

                {/* Actions */}
                <div className="col-span-2 mt-2 flex items-center gap-4 sm:col-span-1 sm:mt-0 sm:justify-end">
                  <Link
                    href={`/admin/advisors/${advisor.id}/edit`}
                    className="text-xs font-medium text-ivory-text/70 transition-colors duration-200 hover:text-copper"
                  >
                    Edit
                  </Link>
                  <DeleteAdvisorButton
                    id={advisor.id!}
                    name={advisor.name}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

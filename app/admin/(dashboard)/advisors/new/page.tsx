import Link from "next/link";
import AdvisorForm from "@/components/admin/AdvisorForm";

export default function NewAdvisorPage() {
  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <Link
          href="/admin/advisors"
          className="text-xs text-ivory-text/45 transition-colors hover:text-ivory-text"
        >
          ← Back to Advisors
        </Link>
        <h1 className="mt-3 font-display text-3xl tracking-tight text-ivory-text">
          Add Advisor
        </h1>
      </div>
      <AdvisorForm mode="new" />
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { getAdvisorById } from "@/lib/advisors";
import AdvisorForm from "@/components/admin/AdvisorForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditAdvisorPage({ params }: Props) {
  const { id } = await params;
  const advisor = await getAdvisorById(id);
  if (!advisor || !advisor.id) notFound();

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
          Edit Advisor
        </h1>
        <p className="mt-1 text-sm text-ivory-text/45">{advisor.name}</p>
      </div>
      <AdvisorForm
        mode="edit"
        advisor={advisor as typeof advisor & { id: string }}
      />
    </div>
  );
}

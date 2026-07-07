import type { Advisor } from "@/types";
import Reveal from "@/components/shared/Reveal";
import AdvisorCard from "@/components/shared/AdvisorCard";

type AdvisorGridProps = {
  advisors: Advisor[];
  whatsappMessage: string;
};

export default function AdvisorGrid({
  advisors,
  whatsappMessage,
}: AdvisorGridProps) {
  const gridClass =
    advisors.length > 1
      ? "mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2"
      : "mx-auto mt-12 max-w-md";

  return (
    <div className={gridClass}>
      {advisors.map((advisor, i) => (
        <Reveal key={advisor.id ?? `${advisor.name}-${i}`} delay={i * 0.08}>
          <AdvisorCard advisor={advisor} whatsappMessage={whatsappMessage} />
        </Reveal>
      ))}
    </div>
  );
}

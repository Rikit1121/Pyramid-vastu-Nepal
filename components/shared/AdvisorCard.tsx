import Link from "next/link";
import type { Advisor } from "@/types";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

type AdvisorCardProps = {
  advisor: Advisor;
  whatsappMessage: string;
};

export default function AdvisorCard({ advisor, whatsappMessage }: AdvisorCardProps) {
  return (
    <div className="flex flex-col items-center rounded-card border border-border-hairline bg-surface p-8 text-center">
      <div className="h-24 w-24 overflow-hidden rounded-full border border-border-hairline">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={advisor.photo}
          alt={advisor.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <h3 className="mt-5 font-display text-xl tracking-tight text-ivory-text">
        {advisor.name}
      </h3>
      <p className="mt-1 text-sm text-copper">{advisor.role}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory-text/45">
        Speaks {advisor.languages.join(" · ")}
      </p>

      <WhatsAppButton
        message={whatsappMessage}
        phoneNumber={advisor.whatsappNumber}
        className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-btn bg-copper px-6 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper"
      />

      <Link
        href="/contact"
        className="mt-4 text-sm text-ivory-text/55 underline-offset-4 transition-colors duration-200 hover:text-ivory-text hover:underline"
      >
        Or send us a message
      </Link>
    </div>
  );
}

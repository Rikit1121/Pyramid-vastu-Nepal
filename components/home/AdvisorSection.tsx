import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import AdvisorGrid from "@/components/shared/AdvisorGrid";
import { getActiveAdvisors } from "@/lib/advisors";

const GENERAL_MESSAGE =
  "Namaste! I'd like to learn more about your Vaastu advisory and geopathic stress services. Please share your availability.";

export default async function AdvisorSection() {
  const advisors = await getActiveAdvisors();
  return (
    <section className="relative overflow-hidden border-t border-border-hairline">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/background5.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-bg-deep/88"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <RevealText
            as="p"
            text="Talk to an Advisor"
            className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
          />
          <RevealText
            as="h2"
            text="Have a question? Speak with us directly"
            className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
          />
          <Reveal delay={0.08}>
            <p className="mt-5 text-base leading-relaxed text-ivory-text/65">
              Reach us on WhatsApp for a quick response — we&rsquo;re here to
              answer your questions about Vaastu advisory and geopathic stress
              assessment.
            </p>
          </Reveal>
        </div>

        <AdvisorGrid advisors={advisors} whatsappMessage={GENERAL_MESSAGE} />
      </div>
    </section>
  );
}

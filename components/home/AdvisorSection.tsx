import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import AdvisorCard from "@/components/shared/AdvisorCard";
import { getPrimaryAdvisor } from "@/lib/advisors";

const GENERAL_MESSAGE =
  "Namaste! I'd like to learn more about your Vastu advisory and healing services. Please share your availability.";

export default async function AdvisorSection() {
  const advisor = await getPrimaryAdvisor();
  return (
    <section className="relative overflow-hidden border-t border-border-hairline">
      {/* Background image with deep overlay */}
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
              13+ years serving Nepal. Certified by India&rsquo;s 48-year-old
              Jeeten Pyramid institute. Call{" "}
              <a
                href="tel:9851151618"
                className="text-copper transition-colors hover:text-gold-line"
              >
                985-115-1618
              </a>{" "}
              or reach us on WhatsApp — we respond promptly.
            </p>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-12 max-w-md" delay={0.1}>
          <AdvisorCard advisor={advisor} whatsappMessage={GENERAL_MESSAGE} />
        </Reveal>
      </div>
    </section>
  );
}

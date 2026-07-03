import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const BOOK_MESSAGE =
  "Namaste! I'd like to book a session with Pyramid Vaastu Nepal. Could you please share your availability?";

export default function BookSessionSection() {
  return (
    <section className="border-t border-border-hairline bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8 lg:py-28">
        <RevealText
          as="p"
          text="Ready to Begin?"
          className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
        />
        <RevealText
          as="h2"
          text="Book Your Session"
          className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
        />
        <RevealText
          as="p"
          text="Whether you're seeking Vastu alignment for your space or a healing therapy session, we're here to guide you. Reach out on WhatsApp for a quick response."
          delay={0.08}
          className="mt-5 text-base leading-relaxed text-ivory-text/70"
        />

        <Reveal delay={0.12} className="mt-10 flex flex-col items-center gap-4">
          <WhatsAppButton message={BOOK_MESSAGE} label="Book on WhatsApp" />
          <Link
            href="/contact"
            className="text-sm text-ivory-text/55 underline-offset-4 transition-colors duration-200 hover:text-ivory-text hover:underline"
          >
            Or send us a message →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

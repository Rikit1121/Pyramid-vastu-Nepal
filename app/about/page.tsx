import type { Metadata } from "next";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import AdvisorCard from "@/components/shared/AdvisorCard";
import { getPrimaryAdvisor } from "@/lib/advisors";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Pyramid Vastu Yantra — ancient Vastu tradition, sacred geometry, and handcrafted copper work rooted in Nepal.",
};

const CREDIBILITY_POINTS = [
  {
    heading: "13+ Years in Practice",
    body: "Pyramid Vaastu Nepal has been serving homes, offices, and businesses across Kathmandu and Nepal for over 13 years — with a consistent, trust-first approach to every consultation.",
  },
  {
    heading: "Certified by Jeeten Pyramid, India",
    body: "Our practice is certified and endorsed by India's 48-year-old Jeeten Pyramid institute — one of the most respected Vastu and pyramid research organisations in South Asia.",
  },
  {
    heading: "Used Across 57 Countries",
    body: "The Pyramid Yantra technique we use is fast, simple, and modern — tested and refined across 57 countries. Vastu defects are corrected without any breaking or cracking of the structure.",
  },
  {
    heading: "Trust Builds Trust",
    body: "Our guiding belief is that resolving Vastu defects opens the path to progress. Every recommendation is practical, personalised, and built on the principle that measurable results speak louder than promises.",
  },
] as const;

const GENERAL_MESSAGE =
  "Namaste! I'd like to learn more about your Vastu advisory and healing services.";

export default async function AboutPage() {
  const advisor = await getPrimaryAdvisor();
  return (
    <article>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border-hairline">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/images/background5.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-bg-deep/80"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-20 lg:px-8">
          <RevealText
            as="p"
            text="Our Story"
            className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
          />
          <RevealText
            as="h1"
            text="Ancient principles, lived today"
            className="font-display text-4xl leading-[1.1] tracking-tight text-ivory-text sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory-text/65">
              13+ years serving Nepal. Certified by India&rsquo;s 48-year-old
              Jeeten Pyramid institute. Successfully used across 57 countries.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Brand story ─────────────────────────────────────────────────── */}
      <section className="border-b border-border-hairline">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
          <div>
            <RevealText
              as="h2"
              text="Where this began"
              className="font-display text-2xl leading-tight tracking-tight text-ivory-text sm:text-3xl"
            />
            <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-[1.75] text-ivory-text/70">
              Pyramid Vaastu Nepal was founded on a single conviction: that
              Vastu Shastra is not folklore — it is a precise, testable
              framework for how energy moves through built space. For 13+ years,
              we have seen it work quietly and consistently in homes, offices,
              and businesses across Kathmandu and Nepal.
            </p>
            <p className="mt-5 text-base leading-[1.75] text-ivory-text/70">
              Certified by India&rsquo;s 48-year-old Jeeten Pyramid institute,
              our technique corrects Vastu defects using Pyramid Yantra — no
              breaking, no cracking, no major structural changes. Fast, simple,
              and modern, it has been used successfully across 57 countries.
            </p>
            </Reveal>
          </div>

          <div>
            <RevealText
              as="h2"
              text="What we believe"
              className="font-display text-2xl leading-tight tracking-tight text-ivory-text sm:text-3xl"
            />
            <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-[1.75] text-ivory-text/70">
              &ldquo;Trust builds trust.&rdquo; This is the phrase we live by.
              Resolving Vastu defects opens the path to progress — in sleep,
              focus, relationships, finances. When the directional zones of a
              home carry the right elements and the geometry resonates, things
              shift — sometimes gradually, sometimes with surprising speed.
            </p>
            <p className="mt-5 text-base leading-[1.75] text-ivory-text/70">
              We also work with the body: our cupping and healing therapy
              practice applies the same logic of balance to the physical form.
              Stagnation in the space and stagnation in the body often mirror
              each other. We address both.
            </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Credibility points ──────────────────────────────────────────── */}
      <section className="border-b border-border-hairline bg-surface/50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl text-center">
            <RevealText
              as="p"
              text="Why Work With Us"
              className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h2"
              text="What sets our practice apart"
              className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
            />
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {CREDIBILITY_POINTS.map((point, i) => (
              <Reveal key={point.heading} delay={i * 0.08}>
                <div className="rounded-card border border-border-hairline bg-surface p-7">
                  <dt className="font-display text-xl tracking-tight text-ivory-text">
                    {point.heading}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-ivory-text/65">
                    {point.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Meet the advisor ────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <RevealText
              as="p"
              text="The Team"
              className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h2"
              text="Who you’ll be working with"
              className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
            />
            <RevealText
              as="p"
              text="Our practice is personal. Every consultation and therapy session is led directly by our advisor — no intermediaries."
              delay={0.1}
              className="mt-5 text-base leading-relaxed text-ivory-text/65"
            />
          </div>

          <Reveal className="mx-auto mt-12 max-w-md">
            <AdvisorCard advisor={advisor} whatsappMessage={GENERAL_MESSAGE} />
          </Reveal>
        </div>
      </section>
    </article>
  );
}

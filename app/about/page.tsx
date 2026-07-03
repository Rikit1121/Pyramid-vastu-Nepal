import type { Metadata } from "next";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import AdvisorCard from "@/components/shared/AdvisorCard";
import { getPrimaryAdvisor } from "@/lib/advisors";
import { OFFICE_ADDRESS, OFFICE_HOURS } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Pyramid Vastu Yantra — ancient Vastu tradition, sacred geometry, and handcrafted copper work rooted in Nepal.",
};

const CREDIBILITY_POINTS = [
  {
    heading: "Personal, Direct Consultations",
    body: "Every Vastu consultation and therapy session is led directly by our advisor — no intermediaries, no generic advice. Your space and your concerns are treated as unique.",
  },
  {
    heading: "Non-Invasive Corrections",
    body: "Our pyramid yantra technique corrects Vastu defects without breaking, cracking, or major structural changes — practical remedies suited to modern homes and offices.",
  },
  {
    heading: "Integrated Vastu & Healing",
    body: "We address both your environment and your body. Stagnation in the space and stagnation in the body often mirror each other — our practice works on both levels.",
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
              Vastu advisory, cupping &amp; healing therapy, and handcrafted
              pyramid yantras — rooted in Kathmandu, guided by tradition.
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
              framework for how energy moves through built space. We have seen
              it work quietly and consistently in homes, offices, and businesses
              across Kathmandu and Nepal.
            </p>
            <p className="mt-5 text-base leading-[1.75] text-ivory-text/70">
              Our technique corrects Vastu defects using Pyramid Yantra — no
              breaking, no cracking, no major structural changes. Fast, simple,
              and modern remedies that fit the way people actually live today.
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

      {/* ── Office photos — scattered/staggered ────────────────────────── */}
      <section className="overflow-hidden border-b border-border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <RevealText
              as="p"
              text="Our Space"
              className="mb-4 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h2"
              text="Where the work happens"
              className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
            />
            <Reveal delay={0.08}>
              <p className="mt-4 text-sm leading-relaxed text-ivory-text/60">
                Our Kathmandu office — come visit us in person.
              </p>
            </Reveal>
          </div>

          {/* Row 1 — photo left, text right */}
          <div className="mb-10 flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:gap-12">
            <Reveal delay={0} className="w-full sm:w-3/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/office1.png"
                alt="Pyramid Vaastu Nepal office"
                className="w-full rounded-[6px] object-cover shadow-lg"
                style={{ aspectRatio: "4 / 3" }}
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={0.1} className="w-full sm:w-2/5 sm:pb-6">
              <p className="text-sm leading-relaxed text-ivory-text/60">
                {OFFICE_ADDRESS}
              </p>
              <p className="mt-2 text-sm text-ivory-text/40">{OFFICE_HOURS}</p>
            </Reveal>
          </div>

          {/* Row 2 — two side-by-side, offset heights */}
          <div className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-start">
            <Reveal delay={0.05} className="w-full sm:mt-10 sm:w-2/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/office3.png"
                alt="Pyramid Vaastu Nepal office — awards"
                className="w-full rounded-[6px] object-cover shadow-lg"
                style={{ aspectRatio: "3 / 4" }}
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={0.12} className="w-full sm:w-3/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/office2.png"
                alt="Pyramid Vaastu Nepal office — consultation room"
                className="w-full rounded-[6px] object-cover shadow-lg"
                style={{ aspectRatio: "4 / 3" }}
                loading="lazy"
              />
            </Reveal>
          </div>

          {/* Row 3 — small photo right-aligned */}
          <div className="flex justify-end">
            <Reveal delay={0.08} className="w-full sm:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/office4.png"
                alt="Pyramid Vaastu Nepal office — library"
                className="w-full rounded-[6px] object-cover shadow-lg"
                style={{ aspectRatio: "4 / 3" }}
                loading="lazy"
              />
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

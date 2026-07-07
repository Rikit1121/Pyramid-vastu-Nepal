import type { Service, Advisor } from "@/types";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import AdvisorGrid from "@/components/shared/AdvisorGrid";

type ServicePageLayoutProps = {
  service: Service;
  heroImage: string;
  advisors: Advisor[];
  /** Optional full-page background (e.g. former hero art moved behind content). */
  pageBackgroundImage?: string;
  heroImageAlt?: string;
  /** Secondary image alongside the process steps. */
  processImage?: string;
  processImageAlt?: string;
  /** Side image in the benefits section. */
  benefitsImage?: string;
  benefitsImageAlt?: string;
};

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-copper"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ServicePageLayout({
  service,
  heroImage,
  advisors,
  heroImageAlt,
  pageBackgroundImage,
  processImage,
  processImageAlt,
  benefitsImage,
  benefitsImageAlt,
}: ServicePageLayoutProps) {
  const sectionBg = pageBackgroundImage
    ? "bg-surface/60 backdrop-blur-sm"
    : "bg-surface/50";
  return (
    <article className="relative">
      {pageBackgroundImage ? (
        <>
          <div
            className="pointer-events-none fixed inset-0 -z-10"
            style={{
              backgroundImage: `url('${pageBackgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none fixed inset-0 -z-10 bg-bg-deep/88"
            aria-hidden="true"
          />
        </>
      ) : null}

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border-hairline">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28">
          {/* Text */}
          <div>
            <RevealText
              as="p"
              text="Our Services"
              className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h1"
              text={service.name}
              className="font-display text-4xl leading-[1.1] tracking-tight text-ivory-text sm:text-5xl lg:text-6xl"
            />
            <RevealText
              as="p"
              text={service.tagline}
              delay={0.1}
              className="mt-6 max-w-lg text-lg leading-relaxed text-ivory-text/70"
            />
          </div>

          {/* Hero image */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card border border-border-hairline shadow-glow-copper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={heroImageAlt ?? service.name}
                className="h-72 w-full object-cover object-top lg:h-[420px]"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Overview ─────────────────────────────────────────────────── */}
      <section className="border-b border-border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
          <RevealText
            as="p"
            text="Overview"
            className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
          />
          <RevealText
            as="h2"
            text="What it is"
            className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
          />
          <Reveal delay={0.1}>
            {service.overview.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className={[
                  "text-base leading-[1.75] text-ivory-text/75",
                  i === 0 ? "mt-6" : "mt-5",
                ].join(" ")}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 3. Process ──────────────────────────────────────────────────── */}
      <section className={`border-b border-border-hairline ${sectionBg}`}>
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <RevealText
              as="p"
              text="How It Works"
              className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h2"
              text="The Process"
              className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
            />
          </div>

          <div
            className={[
              "mt-14",
              processImage
                ? "grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_320px]"
                : "",
            ].join(" ")}
          >
            <ol className="space-y-10">
              {service.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <li className="grid grid-cols-[3rem_1fr] gap-6">
                    {/* Step number */}
                    <span className="font-display text-3xl leading-none tracking-tight text-copper/50 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl tracking-tight text-ivory-text">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ivory-text/65">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            {processImage ? (
              <Reveal delay={0.1} className="lg:sticky lg:top-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={processImage}
                  alt={processImageAlt ?? `${service.name} process`}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4 / 5" }}
                  loading="lazy"
                />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── 4. Benefits ─────────────────────────────────────────────────── */}
      <section className="border-b border-border-hairline">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <RevealText
              as="p"
              text="Benefits"
              className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h2"
              text="What you can expect"
              className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
            />
          </div>

          <div
            className={[
              "mt-12",
              benefitsImage
                ? "grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12"
                : "",
            ].join(" ")}
          >
            <ul
              className={
                benefitsImage
                  ? "grid grid-cols-1 gap-4"
                  : "grid grid-cols-1 gap-4 sm:grid-cols-2"
              }
            >
              {service.benefits.map((benefit, i) => (
                <Reveal key={benefit} delay={i * 0.07}>
                  <li className="flex items-start gap-3 rounded-card border border-border-hairline bg-surface p-5">
                    <CheckIcon />
                    <span className="text-sm leading-relaxed text-ivory-text/80">
                      {benefit}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            {benefitsImage ? (
              <Reveal delay={0.1}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={benefitsImage}
                  alt={benefitsImageAlt ?? `${service.name} benefits`}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4 / 5" }}
                  loading="lazy"
                />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── 5. Advisor CTA ──────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <RevealText
              as="p"
              text="Ready to Begin?"
              className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h2"
              text={
                advisors.length > 1
                  ? "Book a session with our advisors"
                  : "Book a session with our advisor"
              }
              className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
            />
            <RevealText
              as="p"
              text="Reach out directly on WhatsApp — we'll get back to you promptly with availability and session details."
              delay={0.1}
              className="mt-5 text-base leading-relaxed text-ivory-text/65"
            />
          </div>

          <AdvisorGrid
            advisors={advisors}
            whatsappMessage={service.advisorWhatsAppMessage}
          />
        </div>
      </section>
    </article>
  );
}

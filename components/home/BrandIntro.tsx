import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";

// Swap for an actual video ID from the @PyramidVaastuNepal YouTube channel.
const YOUTUBE_VIDEO_ID = "Vo3-277O6QY";

const STATS = [
  { value: "13+", label: "Years in Practice" },
  { value: "57", label: "Countries Reached" },
  { value: "48yr", label: "Jeeten Pyramid Certified" },
] as const;

export default function BrandIntro() {
  return (
    <section className="relative overflow-hidden border-t border-border-hairline">
      {/* Background image with deep overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/background2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-bg-deep/82"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: philosophy text + stats ──────────────────────────── */}
          <div>
            <RevealText
              as="p"
              text="Our Philosophy"
              className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
            />
            <RevealText
              as="h2"
              text="Where ancient geometry meets a balanced life"
              className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-ivory-text/70">
                Rooted in the timeless principles of Vaastu Shastra and sacred
                geometry, we help you bring harmony to the spaces you live and
                work in. Every consultation, assessment, and handcrafted yantra is
                guided by the same belief — a space in balance supports a life
                in balance.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ivory-text/70">
                Vaastu defects can be corrected using Pyramid Yantra without any
                breaking or cracking of the structure — fast, simple, and modern
                techniques used across Nepal and beyond.
              </p>
            </Reveal>

            {/* Callout */}
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-card border border-gold-line/20 bg-surface/60 px-5 py-4">
                <p className="text-sm font-medium leading-snug text-ivory-text/90">
                  Scientific ways to attract Good Fortune into your life
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ivory-text/55">
                  Learn and use this revolutionary method — trusted by 10 million
                  people around the globe.
                </p>
              </div>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border-hairline pt-8">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="text-center sm:text-left">
                    <p className="font-display text-2xl tracking-tight text-copper sm:text-3xl">
                      {value}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-ivory-text/50 uppercase tracking-[0.15em]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Right: YouTube embed ────────────────────────────────────── */}
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-card border border-border-hairline shadow-glow-copper">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                  title="Pyramid Vaastu Nepal — introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.25em] text-gold-line/60">
              Power of Pyramid · @PyramidVaastuNepal
            </p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

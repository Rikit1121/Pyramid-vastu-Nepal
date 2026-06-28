import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";

const SERVICES = [
  {
    href: "/vastu-advisory",
    name: "Vastu Advisory",
    description:
      "Align your home or workplace with the principles of Vastu Shastra — directional balance, energy flow, and placement guidance tailored to your space. Vastu defects corrected without breaking or cracking the structure.",
    image: "/images/background4.png",
    imageAlt: "Vastu Advisory — sacred geometry consultation",
  },
  {
    href: "/cupping-healing",
    name: "Cupping & Healing Therapy",
    description:
      "Traditional cupping and energy-healing therapy to release tension, restore circulation, and rebalance the body's natural flow — combining ancient Nepali and Eastern healing traditions.",
    image: "/images/Healing_Therapy.png",
    imageAlt: "Cupping & Healing Therapy session",
  },
] as const;

function ArrowRight() {
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
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ServicesBlock() {
  return (
    <section id="services" className="border-t border-border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <RevealText
            as="p"
            text="What We Offer"
            className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
          />
          <RevealText
            as="h2"
            text="Our Services"
            className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
          />
          <RevealText
            as="p"
            text="Guidance and therapy grounded in tradition — the heart of what we do."
            className="mt-5 text-base leading-relaxed text-ivory-text/70"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.href} delay={i * 0.1}>
              <Link
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-card border border-border-hairline bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-gold-line/40 hover:shadow-glow-gold"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  {/* Subtle gradient at bottom for text legibility */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface/80 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl tracking-tight text-ivory-text">
                    {service.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-text/70">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-copper">
                    Learn More
                    <ArrowRight />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pyramid Vastu Yantra — Vastu advisory, healing therapy, and handcrafted sacred geometry in Kathmandu, Nepal.",
};

// Placeholder — swap for a real video ID from the brand's YouTube channel.
const YOUTUBE_VIDEO_ID = "gRo9XeFVgZU";

const GENERAL_MESSAGE =
  "Namaste! I'd like to get in touch about your Vastu advisory and healing services.";

// Inline SVG social icons — 1.5px stroke, outline only (lucide-react v1 dropped brand icons)
function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconYoutube() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-gold-line">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-gold-line">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

const SOCIALS = [
  { href: "https://www.instagram.com/pyramidvaastunepal", label: "Instagram", Icon: IconInstagram },
  { href: "https://www.facebook.com/pyramidvaastunepal", label: "Facebook", Icon: IconFacebook },
  { href: "https://www.youtube.com/@PyramidVaastuNepal", label: "YouTube", Icon: IconYoutube },
] as const;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8 lg:pb-28">
      {/* Page header */}
      <div className="max-w-2xl">
        <RevealText
          as="p"
          text="Get in Touch"
          className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
        />
        <RevealText
          as="h1"
          text="We’d love to hear from you"
          className="font-display text-4xl leading-tight tracking-tight text-ivory-text sm:text-5xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-ivory-text/65">
            Whether you have a question about our services, want to book a
            consultation, or are interested in a product — reach out using any
            of the channels below.
          </p>
        </Reveal>
      </div>

      <div className="my-12 border-t border-border-hairline" />

      {/* Two-column: form left, connect info right */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_360px] lg:gap-16">

        {/* ── Contact form ────────────────────────────────────────────── */}
        <Reveal>
          <h2 className="mb-8 font-display text-2xl tracking-tight text-ivory-text">
            Send a message
          </h2>
          <ContactForm />
        </Reveal>

        {/* ── Connect info ────────────────────────────────────────────── */}
        <Reveal delay={0.1} className="flex flex-col gap-10">

          {/* WhatsApp */}
          <div>
            <h2 className="mb-4 font-display text-2xl tracking-tight text-ivory-text">
              Chat on WhatsApp
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-ivory-text/60">
              The fastest way to reach us. We typically respond within a few hours.
            </p>
            <WhatsAppButton message={GENERAL_MESSAGE} />
          </div>

          <div className="border-t border-border-hairline" />

          {/* Location + email */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold-line">
              Find Us
            </p>
            <div className="flex items-start gap-3">
              <MapPinIcon />
              <div>
                <p className="text-sm text-ivory-text/80">Kathmandu, Nepal</p>
                <p className="mt-0.5 text-xs text-ivory-text/45">
                  Consultations by appointment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MailIcon />
              <div>
                <a
                  href="tel:9851151618"
                  className="block text-sm text-ivory-text/80 underline-offset-4 transition-colors duration-200 hover:text-ivory-text hover:underline"
                >
                  Mobile: 985-115-1618
                </a>
                <a
                  href="tel:015909618"
                  className="mt-1 block text-sm text-ivory-text/80 underline-offset-4 transition-colors duration-200 hover:text-ivory-text hover:underline"
                >
                  Landline: 01-590-9618
                </a>
                <a
                  href="mailto:hello@pyramidvastu.com"
                  className="mt-1 block text-sm text-ivory-text/80 underline-offset-4 transition-colors duration-200 hover:text-ivory-text hover:underline"
                >
                  hello@pyramidvastu.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border-hairline" />

          {/* Social links */}
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold-line">
              Follow Us
            </p>
            <div className="flex items-center gap-5">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-ivory-text/45 transition-colors duration-200 hover:text-gold-line"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── YouTube embed — full width below both columns ─────────────── */}
      <Reveal className="mt-20">
        <div className="border-t border-border-hairline pt-16">
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold-line">
            Watch
          </p>
          <h2 className="mb-8 font-display text-2xl tracking-tight text-ivory-text">
            See our work
          </h2>
          {/*
           * Responsive 16:9 YouTube embed.
           * Swap YOUTUBE_VIDEO_ID for the real channel video ID.
           * The padding-bottom trick (56.25% = 9/16) keeps the aspect ratio
           * at all viewport widths without JS.
           */}
          <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="Pyramid Vastu Yantra — introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

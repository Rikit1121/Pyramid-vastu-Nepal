import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import { EMAILS } from "@/lib/contact";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description: "Terms and conditions for using the Pyramid Vaastu Nepal website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />
      <section className="relative overflow-hidden border-b border-border-hairline">
        <div
          className="pointer-events-none absolute inset-0 bg-bg-deep/95"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-16 lg:px-8">
          <RevealText
            as="p"
            text="Legal"
            className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
          />
          <RevealText
            as="h1"
            text="Terms of Use"
            className="font-display text-4xl leading-[1.1] tracking-tight text-ivory-text sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm text-ivory-text/50">
              Last updated: July 2026
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <Reveal>
          <div className="space-y-8 text-sm leading-relaxed text-ivory-text/70">
            <div>
              <h2 className="font-display text-xl text-ivory-text">
                Use of this website
              </h2>
              <p className="mt-3">
                By accessing this website, you agree to use it for lawful
                purposes only. Content on this site — including text, images,
                and product information — is provided for general information
                and is subject to change without notice.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-ivory-text">
                Services &amp; consultations
              </h2>
              <p className="mt-3">
                Vaastu advisory, geopathic stress assessment, and product
                enquiries are arranged directly with our team. Appointments and
                pricing are confirmed on a case-by-case basis. Nothing on this
                website constitutes a binding contract until agreed in writing
                or confirmed directly with us.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-ivory-text">
                Disclaimer
              </h2>
              <p className="mt-3">
                Vaastu and geopathic stress practices are complementary approaches. They
                are not a substitute for professional medical, legal, or
                financial advice. Results vary by individual and circumstance.
                We make no guarantees of specific outcomes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-ivory-text">
                Intellectual property
              </h2>
              <p className="mt-3">
                All content, branding, and materials on this website belong to
                Pyramid Vaastu Nepal unless otherwise stated. You may not
                reproduce or distribute our content without prior written
                permission.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-ivory-text">Contact</h2>
              <p className="mt-3">
                Questions about these terms? Email us at{" "}
                <a
                  href={`mailto:${EMAILS[0]}`}
                  className="text-ivory-text underline-offset-4 transition-colors duration-200 hover:text-gold-line hover:underline"
                >
                  {EMAILS[0]}
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <Link
            href="/"
            className="text-sm text-ivory-text/45 transition-colors duration-200 hover:text-ivory-text"
          >
            ← Back to home
          </Link>
        </Reveal>
      </section>
    </article>
  );
}

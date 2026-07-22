import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import { EMAILS } from "@/lib/contact";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "How Pyramid Vaastu Nepal collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
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
            text="Privacy Policy"
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
                Information we collect
              </h2>
              <p className="mt-3">
                When you contact us via our website form, WhatsApp, email, or
                phone, we may collect your name, email address, phone number,
                and any details you choose to share about your enquiry or
                consultation needs.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-ivory-text">
                How we use your information
              </h2>
              <p className="mt-3">
                We use this information solely to respond to your enquiries,
                schedule consultations, provide Vaastu advisory, geopathic stress
                assessment, and follow up on product enquiries. We do not sell or
                rent your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-ivory-text">
                Cookies &amp; analytics
              </h2>
              <p className="mt-3">
                This website may use essential cookies required for basic
                functionality. We do not use invasive tracking or advertising
                cookies. If we add analytics in the future, this policy will be
                updated accordingly.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-ivory-text">
                Data retention
              </h2>
              <p className="mt-3">
                We retain contact and consultation records only as long as
                needed to serve you and meet any legal obligations. You may
                request deletion of your data by contacting us directly.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-ivory-text">Contact</h2>
              <p className="mt-3">
                For privacy-related questions, reach us at{" "}
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

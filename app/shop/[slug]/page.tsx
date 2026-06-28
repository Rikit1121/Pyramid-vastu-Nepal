import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import Reveal from "@/components/shared/Reveal";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

type Props = { params: Promise<{ slug: string }> };

// Live data — always reflect current catalog.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description.slice(0, 155),
  };
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function BackArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const enquiryMessage = `Namaste! I'm interested in the ${product.name} (NPR ${product.price.toLocaleString()}). Could you please share availability and ordering details?`;

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 lg:px-8 lg:pt-32 lg:pb-28">
      {/* Back link */}
      <Reveal>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-ivory-text/50 transition-colors duration-200 hover:text-ivory-text"
        >
          <BackArrow />
          All Products
        </Link>
      </Reveal>

      {/* Main content — two columns on desktop */}
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ── Left: image gallery ───────────────────────────────── */}
        <Reveal className="flex flex-col gap-3">
          {/* Primary image — sharp 0px frame per design.md */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full object-cover"
            style={{ aspectRatio: "1 / 1" }}
            loading="eager"
          />

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {product.images.slice(1).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`${product.name} view ${i + 2}`}
                  className="aspect-square w-full object-cover opacity-80 transition-opacity duration-200 hover:opacity-100"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </Reveal>

        {/* ── Right: product info ───────────────────────────────── */}
        <Reveal delay={0.1} className="flex flex-col">
          {/* Stock badge */}
          <p
            className={`mb-4 text-[10px] uppercase tracking-[0.25em] ${
              product.inStock ? "text-copper" : "text-ivory-text/40"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <h1 className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-medium text-copper">
            NPR {product.price.toLocaleString()}
          </p>

          <p className="mt-6 text-sm leading-[1.75] text-ivory-text/70">
            {product.description}
          </p>

          {/* Specs */}
          {(product.material || product.size) && (
            <dl className="mt-8 space-y-2 border-t border-border-hairline pt-6">
              {product.material && (
                <div className="flex gap-3 text-sm">
                  <dt className="w-20 shrink-0 text-ivory-text/45">Material</dt>
                  <dd className="text-ivory-text/80">{product.material}</dd>
                </div>
              )}
              {product.size && (
                <div className="flex gap-3 text-sm">
                  <dt className="w-20 shrink-0 text-ivory-text/45">Size</dt>
                  <dd className="text-ivory-text/80">{product.size}</dd>
                </div>
              )}
            </dl>
          )}

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="mt-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold-line">
                Vastu Significance
              </p>
              <ul className="space-y-2.5">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm leading-relaxed text-ivory-text/70">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Enquire CTA — WhatsApp, not checkout */}
          <div className="mt-10 flex flex-col gap-3 border-t border-border-hairline pt-8">
            <WhatsAppButton
              message={enquiryMessage}
              label="Enquire Now"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-btn bg-copper px-6 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper"
            />
            <Link
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-btn border border-copper px-6 text-sm font-medium text-copper transition-colors duration-200 hover:bg-copper hover:text-ivory-text"
            >
              Or send us a message
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

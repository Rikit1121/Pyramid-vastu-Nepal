import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import RevealText from "@/components/shared/RevealText";
import Reveal from "@/components/shared/Reveal";
import OrbitalShowcase from "@/components/home/OrbitalShowcase";

/**
 * Homepage shop teaser — circular/orbital arrangement of products (mandala
 * register, design.md's approved "architectural, non-carousel" idea).
 * Secondary visual weight vs. the services block, per architecture.md.
 */
export default async function ShopShowcase() {
  const products = await getAllProducts();

  return (
    <section className="relative overflow-hidden border-t border-border-hairline">
      {/* Background with overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/background6.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-bg-deep/85"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center lg:px-8 lg:py-24">
        <RevealText
          as="p"
          text="Our Collection"
          className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
        />
        <RevealText
          as="h2"
          text="Explore Our Pyramids & Yantras"
          className="font-display text-3xl leading-tight tracking-tight text-ivory-text sm:text-4xl"
        />

        {products.length === 0 ? (
          <Reveal>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ivory-text/60">
              Sacred-geometry pieces are on their way. Reach out on
              WhatsApp for current availability.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14">
            <OrbitalShowcase products={products} />
          </div>
        )}

        <Reveal className="mt-14" delay={0.1}>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-btn border border-copper px-6 text-sm font-medium text-copper transition-[background-color,color,box-shadow] duration-300 ease-out hover:bg-copper hover:text-ivory-text"
          >
            Visit Shop
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

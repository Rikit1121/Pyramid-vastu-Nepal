import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Handcrafted pyramids, yantras, and sacred-geometry pieces — rooted in Vaastu tradition.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="relative min-h-screen">
      {/* Page background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/background6.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-bg-deep/85"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8 lg:pb-28">
        <Reveal className="max-w-2xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line">
            Sacred Geometry
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ivory-text sm:text-5xl">
            Pyramids &amp; Yantras
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ivory-text/65">
            Each piece is handcrafted in authentic Vaastu proportions. Browse the
            range below — for enquiries or guidance on which piece suits your
            space, contact us directly on WhatsApp.
          </p>
        </Reveal>

        <div className="my-14 border-t border-border-hairline" />

        {products.length === 0 ? (
          <div className="rounded-card border border-border-hairline bg-surface/80 px-6 py-20 text-center backdrop-blur-sm">
            <p className="font-display text-2xl tracking-tight text-ivory-text">
              New pieces coming soon
            </p>
            <p className="mt-3 text-sm text-ivory-text/55">
              Our catalog is being prepared. In the meantime, reach out on WhatsApp
              for current availability.
            </p>
          </div>
        ) : (
          <Reveal>
            <ul
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

function ArrowRight() {
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
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border-hairline bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-gold-line/40 hover:shadow-glow-gold"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={firstImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          loading="lazy"
        />
        {!product.inStock && (
          <span className="absolute top-3 right-3 rounded-btn bg-bg-deep/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory-text/60">
            Out of Stock
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug tracking-tight text-ivory-text">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory-text/60 line-clamp-3">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-base font-medium text-copper">
            NPR {product.price.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ivory-text/50 group-hover:text-ivory-text transition-colors duration-200">
            View Details
            <ArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

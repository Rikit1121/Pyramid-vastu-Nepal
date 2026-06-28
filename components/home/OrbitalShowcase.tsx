"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Product } from "@/types";

type OrbitalShowcaseProps = {
  products: Product[];
};

// Desktop circle geometry (px, within a 480×480 stage).
const STAGE = 480;
const CENTER = STAGE / 2;
const RADIUS = 168;
const INNER_RADIUS = 92;

/** A single product "orb" — circular framed image + label, with isolated hover. */
function OrbNode({ product, size }: { product: Product; size: number }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col items-center gap-2"
      style={{ width: size }}
    >
      <span
        className="relative block overflow-hidden rounded-full border border-border-hairline bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:scale-[1.06] group-hover:border-gold-line/50 group-hover:shadow-glow-copper"
        style={{ width: size, height: size }}
      >
        {product.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-bg-deep" />
        )}
      </span>
      <span className="max-w-[7.5rem] text-center text-[11px] leading-tight text-ivory-text/55 transition-colors duration-300 group-hover:text-ivory-text">
        {product.name}
      </span>
    </Link>
  );
}

export default function OrbitalShowcase({ products }: OrbitalShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const items = products.slice(0, 5);
  const n = items.length;

  const nodeContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const nodeItem: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.85 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const nodes = items.map((product, i) => {
    const angle = ((-90 + (360 / n) * i) * Math.PI) / 180;
    return {
      product,
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    };
  });

  const viewport = { once: true, margin: "-80px" } as const;

  return (
    <>
      {/* ── Desktop: architectural circle ─────────────────────────────── */}
      <motion.div
        className="relative mx-auto hidden md:block"
        style={{ width: STAGE, height: STAGE }}
        variants={nodeContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {/* Decorative mandala geometry (static, subtle) */}
        <svg
          viewBox={`0 0 ${STAGE} ${STAGE}`}
          className="absolute inset-0 h-full w-full text-gold-line/15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS} />
          <circle cx={CENTER} cy={CENTER} r={INNER_RADIUS} />
          {nodes.map((node, i) => (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={node.x}
              y2={node.y}
            />
          ))}
        </svg>

        {/* Center medallion */}
        <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border-hairline bg-surface/60 text-center backdrop-blur-sm">
          <svg
            width="44"
            height="44"
            viewBox="0 0 120 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gold-line/60"
            aria-hidden="true"
          >
            <circle cx="60" cy="60" r="22" />
            <circle cx="60" cy="38" r="22" />
            <circle cx="60" cy="82" r="22" />
            <circle cx="41" cy="49" r="22" />
            <circle cx="79" cy="49" r="22" />
            <circle cx="41" cy="71" r="22" />
            <circle cx="79" cy="71" r="22" />
          </svg>
          <span className="mt-1 text-[9px] uppercase tracking-[0.25em] text-gold-line/70">
            Yantra
          </span>
        </div>

        {/* Product orbs — anchored by top-left (node center minus half the orb)
            so framer's scale transform doesn't fight a translate offset. */}
        {nodes.map((node) => (
          <motion.div
            key={node.product.id}
            className="absolute"
            style={{ left: node.x - 52, top: node.y - 52 }}
            variants={nodeItem}
          >
            <OrbNode product={node.product} size={104} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Mobile/tablet fallback: centered wrap (circle is too tight) ── */}
      <motion.div
        className="flex flex-wrap items-start justify-center gap-x-6 gap-y-8 md:hidden"
        variants={nodeContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {items.map((product) => (
          <motion.div key={product.id} variants={nodeItem}>
            <OrbNode product={product} size={96} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

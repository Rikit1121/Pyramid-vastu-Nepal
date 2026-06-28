"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type RevealTextProps = {
  text: string;
  as?: Tag;
  className?: string;
  /** Delay before the first word starts (seconds). */
  delay?: number;
};

/**
 * Word-by-word scroll reveal for headings and short lines (ReactBits "Scroll
 * Reveal" register, approved in design.md).
 *
 * Tuned to be FAST and barely-conscious polish, not a performance: each word
 * fades + lifts 8px over 360ms ease-out, staggered 45ms. A typical heading
 * (~6 words) fully resolves in well under 700ms. Reserve this for headings,
 * overlines, and short 1–2 sentence intros — long body copy should use the
 * plain <Reveal> fade instead.
 *
 * Honors prefers-reduced-motion (collapses to a single quiet fade).
 */
export default function RevealText({
  text,
  as = "span",
  className,
  delay = 0,
}: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as;
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.045,
        delayChildren: delay,
      },
    },
  };

  const word: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}

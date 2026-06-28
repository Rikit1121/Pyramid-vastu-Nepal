"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const VIDEO_SRC = "/videos/hero-video.mp4";
const POSTER_SRC = "/images/hero_poster1.png";

// Let the sacred-geometry build play first; text arrives as it settles.
const REVEAL_DELAY = 2.4;

// Dark gradient over the video — radial (darker edges, gold burst stays visible
// at center) plus a bottom-up wash, both blending toward --bg-deep (#0E0D12)
// for nav + hero text legibility.
const OVERLAY_BACKGROUND =
  "radial-gradient(ellipse at 50% 42%, rgba(14,13,18,0.10) 0%, rgba(14,13,18,0.45) 55%, rgba(14,13,18,0.88) 100%)," +
  "linear-gradient(to top, rgba(14,13,18,0.96) 0%, rgba(14,13,18,0.35) 38%, rgba(14,13,18,0.10) 100%)";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // null = undetermined (SSR/first paint); we only mount the video on desktop.
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Freeze on the final frame: pause and hold currentTime at the end.
  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (Number.isFinite(video.duration)) {
      video.currentTime = Math.max(0, video.duration - 0.04);
    }
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: prefersReducedMotion ? 0 : REVEAL_DELAY,
      },
    },
  };

  const item: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden">
      {/* Poster: always present so there is never a blank background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Video: desktop only (skip on mobile for performance/battery) */}
      {isDesktop && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
        />
      )}

      {/* Dark gradient overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{ background: OVERLAY_BACKGROUND }}
        aria-hidden="true"
      />

      {/* Hero content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-20 text-center sm:pb-28 lg:px-8"
      >
        <motion.p
          variants={item}
          className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold-line"
        >
          Ancient Geometry, Modern Living
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-4xl leading-[1.1] tracking-tight text-ivory-text sm:text-6xl lg:text-7xl"
        >
          Align your space with sacred geometry
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory-text/70 sm:text-lg"
        >
          Vastu advisory, cupping &amp; healing therapy, and handcrafted pyramid
          yantras — rooted in ancient Nepali tradition.
        </motion.p>

        <motion.div variants={item} className="mt-9">
          <Link
            href="/vastu-advisory"
            className="inline-flex h-12 items-center justify-center rounded-btn bg-copper px-8 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper"
          >
            Explore Our Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

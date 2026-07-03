"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/vastu-advisory", label: "Vastu Advisory" },
  { href: "/cupping-healing", label: "Cupping & Healing" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close overlay on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border-hairline bg-surface/95 backdrop-blur-md"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none"
            aria-label="Pyramid Vastu Yantra — home"
          >
            <span className="font-display text-[17px] tracking-wide text-ivory-text">
              Pyramid Vaastu
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold-line">
              Nepal · Power of Pyramid
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 md:flex" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "relative text-sm transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-center after:bg-copper after:transition-transform after:duration-300 after:ease-out",
                      isActive
                        ? "text-copper after:scale-x-100"
                        : "text-ivory-text/65 hover:text-ivory-text after:scale-x-0 hover:after:scale-x-100",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile: hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center text-ivory-text md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-nav"
        aria-hidden={!mobileOpen}
        className={[
          "fixed inset-0 z-40 flex flex-col bg-bg-deep transition-opacity duration-200 md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {/* Spacer for nav bar height */}
        <div className="h-16 shrink-0" />

        {/* Links */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "font-display text-2xl tracking-wide transition-colors duration-200",
                  isActive
                    ? "text-copper"
                    : "text-ivory-text hover:text-copper",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom tagline */}
        <p className="pb-10 text-center text-[10px] uppercase tracking-[0.3em] text-gold-line/50">
          Vastu · Healing · Sacred Geometry
        </p>
      </div>
    </>
  );
}

import Link from "next/link";
import {
  EMAILS,
  FOOTER_TAGLINE,
  PHONES,
  SOCIAL_LINKS,
} from "@/lib/contact";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/vastu-advisory", label: "Vastu Advisory" },
  { href: "/cupping-healing", label: "Cupping & Healing" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// Inline SVGs — outline, 1.5px stroke — lucide-react removed brand icons in v1+
function IconInstagram() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

const SOCIALS = [
  { ...SOCIAL_LINKS[0], Icon: IconInstagram },
  { ...SOCIAL_LINKS[1], Icon: IconFacebook },
  { ...SOCIAL_LINKS[2], Icon: IconYoutube },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-hairline">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/footer.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-bg-deep/90"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-display text-lg tracking-wide text-ivory-text">
              Pyramid Vaastu Nepal
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-copper">
              Power of Pyramid
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory-text/55">
              {FOOTER_TAGLINE}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold-line">
              Pages
            </p>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-ivory-text/55 transition-colors duration-200 hover:text-ivory-text"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold-line">
              Connect
            </p>
            {PHONES.map(({ label, display, tel }) => (
              <a
                key={tel}
                href={`tel:${tel}`}
                className="mt-1 block text-sm text-ivory-text/55 transition-colors duration-200 hover:text-ivory-text first:mt-0"
              >
                {label}: {display}
              </a>
            ))}
            {EMAILS.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="mt-1 block text-sm text-ivory-text/55 transition-colors duration-200 hover:text-ivory-text"
              >
                {email}
              </a>
            ))}
            <div className="mt-6 flex items-center gap-5">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-ivory-text/45 transition-colors duration-200 hover:text-gold-line"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-border-hairline pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-ivory-text/35">
            © {new Date().getFullYear()} Pyramid Vaastu Nepal. All rights reserved.
          </p>
          <p className="text-xs text-ivory-text/35">Kathmandu, Nepal</p>
        </div>
      </div>
    </footer>
  );
}

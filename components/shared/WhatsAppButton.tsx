import { WHATSAPP_NUMBER } from "@/lib/contact";
import { ADVISOR } from "@/lib/services";

type WhatsAppButtonProps = {
  message: string;
  label?: string;
  className?: string;
  /** Override the phone number (e.g. from a DB advisor). Falls back to the
   *  static ADVISOR.whatsappNumber from lib/services.ts. */
  phoneNumber?: string;
};

function ChatIcon() {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

/**
 * Single source of WhatsApp deep-link logic.
 * Number comes from the central ADVISOR config — change it there once, it
 * updates everywhere (AdvisorCard, service pages, product enquiries).
 */
export default function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  className,
  phoneNumber,
}: WhatsAppButtonProps) {
  const number = phoneNumber ?? ADVISOR.whatsappNumber;
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex h-12 items-center justify-center gap-2 rounded-btn bg-copper px-6 text-sm font-medium text-ivory-text transition-shadow duration-200 ease-out hover:shadow-glow-copper"
      }
    >
      <ChatIcon />
      {label}
    </a>
  );
}

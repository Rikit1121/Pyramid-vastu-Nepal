"use client";

import { useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = { name: "", email: "", phone: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

const inputBase =
  "w-full rounded-btn border border-border-hairline bg-surface px-4 py-3 text-sm text-ivory-text placeholder:text-ivory-text/30 transition-colors duration-200 focus:border-copper/60 focus:outline-none";

const errorClass = "mt-1.5 text-xs text-copper/90";

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-border-hairline bg-surface p-8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold-line">
          Message sent
        </span>
        <p className="font-display text-2xl tracking-tight text-ivory-text">
          Thank you, {values.name.split(" ")[0]}.
        </p>
        <p className="text-sm leading-relaxed text-ivory-text/65">
          We&rsquo;ve received your message and will be in touch shortly. For
          faster responses, you&rsquo;re welcome to reach us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(INITIAL);
            setErrors({});
            setSubmitted(false);
          }}
          className="mt-2 text-sm text-ivory-text/50 underline-offset-4 transition-colors duration-200 hover:text-ivory-text hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-ivory-text/55"
        >
          Name <span className="text-copper">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={[inputBase, errors.name ? "border-copper/50" : ""].join(" ")}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-ivory-text/55"
        >
          Email <span className="text-copper">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={[inputBase, errors.email ? "border-copper/50" : ""].join(" ")}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      {/* Phone (optional) */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-ivory-text/55"
        >
          Phone{" "}
          <span className="normal-case tracking-normal text-ivory-text/35">
            (optional)
          </span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder="+977 98XXXXXXXX"
          className={inputBase}
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-ivory-text/55"
        >
          Message <span className="text-copper">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder="Tell us about your space, your goals, or anything you'd like to know…"
          className={[
            inputBase,
            "resize-none",
            errors.message ? "border-copper/50" : "",
          ].join(" ")}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 inline-flex h-12 items-center justify-center rounded-btn bg-copper px-8 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithPassword } from "@/lib/auth";

const inputBase =
  "w-full rounded-btn border border-border-hairline bg-bg-deep px-4 py-3 text-sm text-ivory-text placeholder:text-ivory-text/30 transition-colors duration-200 focus:border-copper/60 focus:outline-none";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await signInWithPassword(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Session cookie is now set; refresh so the proxy/server see it, then go in.
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 pt-32 pb-20">
      <div className="rounded-card border border-border-hairline bg-surface p-8">
        <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-gold-line">
          Admin
        </p>
        <h1 className="font-display text-2xl tracking-tight text-ivory-text">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-ivory-text/55">
          Restricted area. Authorised staff only.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-ivory-text/55"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputBase}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-ivory-text/55"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputBase}
            />
          </div>

          {error && (
            <p className="rounded-btn border border-copper/40 bg-copper/10 px-3 py-2 text-xs text-ivory-text/80">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex h-12 items-center justify-center rounded-btn bg-copper px-8 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

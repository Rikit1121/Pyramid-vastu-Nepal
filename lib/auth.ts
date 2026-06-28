import { createClient } from "@/lib/supabase";

/**
 * Client-side auth helpers — for use in Client Components (login form, logout
 * button). These use the browser client, whose session is cookie-backed so the
 * server can read it.
 *
 * Server-side auth checks (proxy.ts, admin layout, server actions) use
 * getServerUser() from lib/supabase-server.ts instead — that is the
 * authoritative, non-bypassable check.
 */

/** Email/password sign-in for the single admin user. */
export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient();
  return supabase.auth.signInWithPassword({ email, password });
}

/** Sign the current user out (clears the cookie-backed session). */
export async function signOut() {
  const supabase = createClient();
  return supabase.auth.signOut();
}

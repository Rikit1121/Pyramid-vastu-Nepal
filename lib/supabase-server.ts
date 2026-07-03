import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase";
import { supabaseFetch } from "@/lib/supabase-fetch";

/**
 * Server Supabase client — for Server Components, Server Actions, and Route
 * Handlers. Reads/writes the auth session from the request cookies via
 * next/headers, so it shares the session established by the browser client.
 *
 * Uses the anon/publishable key, so writes are still governed by RLS: only a
 * genuinely authenticated session can mutate the products table. The
 * service-role/secret key is intentionally NOT used anywhere in this codebase.
 */
export async function createServerSupabase() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    );
  }

  return createServerClient<Database>(url, anonKey, {
    global: {
      fetch: supabaseFetch,
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // In Server Components, cookie mutation throws — safe to ignore there,
        // since the proxy refreshes the session on each request. Server Actions
        // and Route Handlers CAN set cookies, so sign-in/out persists.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          /* called from a Server Component — ignore */
        }
      },
    },
  });
}

/**
 * Server-side authenticated user, verified against the Supabase auth server
 * (not just decoded from the cookie). Returns null when signed out.
 * Use this to gate admin Server Components and Server Actions.
 */
export async function getServerUser(): Promise<User | null> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

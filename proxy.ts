import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Next.js 16 Proxy (formerly middleware) — runs on the Node.js runtime.
 *
 * Server-side protection for /admin: every request under /admin (except the
 * login page) must carry a valid, server-verified Supabase session, or it is
 * redirected to /admin/login. Because this runs at the network boundary before
 * the page renders, it cannot be bypassed by a client.
 *
 * It also refreshes the auth session cookies on each request (the standard
 * @supabase/ssr pattern), keeping server and client sessions in sync.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getUser() verifies the JWT with the Supabase auth server — do not trust
  // getSession() alone here.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";

  // Unauthenticated → bounce to login (preserve intended destination).
  if (!user && !isLoginRoute) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Already authenticated and hitting the login page → send to dashboard.
  if (user && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  // Only run on admin routes. Excludes the whole public site, static assets,
  // and image optimization.
  matcher: ["/admin/:path*"],
};

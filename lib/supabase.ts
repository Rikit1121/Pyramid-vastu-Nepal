import { createBrowserClient } from "@supabase/ssr";
import { supabaseFetch } from "@/lib/supabase-fetch";

/**
 * Browser Supabase client — for use in Client Components only.
 *
 * Built on @supabase/ssr's createBrowserClient, which stores the auth session
 * in cookies (not just localStorage) so the SAME session is readable by the
 * server (proxy.ts, Server Components, Server Actions). This is what makes
 * server-side route protection possible.
 *
 * Uses the public/anon (publishable) key → safe in the browser; every query is
 * constrained by the RLS policies in supabase/schema.sql. The service-role key
 * is NEVER used here.
 *
 * The Database type mirrors supabase/schema.sql. Regenerate from the live
 * schema with: supabase gen types typescript --project-id <id> > types/database.ts
 */

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string;
          content?: string;
          cover_image?: string | null;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          cover_image?: string | null;
          published?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      advisors: {
        Row: {
          id: string;
          name: string;
          role: string;
          photo: string | null;
          whatsapp_number: string;
          languages: string[];
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string;
          photo?: string | null;
          whatsapp_number?: string;
          languages?: string[];
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          photo?: string | null;
          whatsapp_number?: string;
          languages?: string[];
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          price: number;
          description: string;
          benefits: string[] | null;
          material: string | null;
          size: string | null;
          images: string[];
          in_stock: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          price: number;
          description: string;
          benefits?: string[] | null;
          material?: string | null;
          size?: string | null;
          images?: string[];
          in_stock?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          price?: number;
          description?: string;
          benefits?: string[] | null;
          material?: string | null;
          size?: string | null;
          images?: string[];
          in_stock?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type AdvisorRow = Database["public"]["Tables"]["advisors"]["Row"];
export type AdvisorInsert = Database["public"]["Tables"]["advisors"]["Insert"];
export type AdvisorUpdate = Database["public"]["Tables"]["advisors"]["Update"];

export type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
export type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];

function readEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see .env.example).",
    );
  }
  return { url, anonKey };
}

/** Create a browser client. Call only in Client Components. */
export function createClient() {
  const { url, anonKey } = readEnv();
  return createBrowserClient<Database>(url, anonKey, {
    global: {
      fetch: supabaseFetch,
    },
  });
}

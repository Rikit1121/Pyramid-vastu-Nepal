import type { BlogPost } from "@/types";
import type { BlogPostRow } from "@/lib/supabase";
import { createServerSupabase } from "@/lib/supabase-server";
import { withQueryTimeout } from "@/lib/supabase-timeout";

function rowToPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image ?? null,
    published: row.published,
    createdAt: row.created_at,
  };
}

/** All published posts — public read path (RLS enforces published = true for anon). */
export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(rowToPost);
  } catch {
    return [];
  }
}

/** Up to `limit` most recent published posts — for homepage teaser. */
export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  return withQueryTimeout(fetchRecentPosts(limit), []);
}

async function fetchRecentPosts(limit: number): Promise<BlogPost[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map(rowToPost);
  } catch {
    return [];
  }
}

/** Single published post by slug — public. Returns null if not found or unpublished. */
export async function getPublishedPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) return null;
    return rowToPost(data);
  } catch {
    return null;
  }
}

/** All posts (including drafts) — admin only. Uses authenticated session via cookies. */
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(rowToPost);
  } catch {
    return [];
  }
}

/** Single post by ID — admin only. */
export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return rowToPost(data);
  } catch {
    return null;
  }
}

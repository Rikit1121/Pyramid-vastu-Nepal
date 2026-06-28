import type { Product } from "@/types";
import type { ProductRow } from "@/lib/supabase";
import { createServerSupabase } from "@/lib/supabase-server";

/**
 * Live product data access (Phase 8 cutover).
 * Reads come through the anon/public RLS policy, so these work for any visitor
 * on /shop without authentication. Server-only (use in Server Components /
 * Server Actions).
 */

/** Map a snake_case DB row to the camelCase Product domain type. */
export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    description: row.description,
    benefits: row.benefits ?? undefined,
    material: row.material ?? undefined,
    size: row.size ?? undefined,
    images: row.images ?? [],
    inStock: row.in_stock,
    createdAt: row.created_at,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllProducts error:", error.message);
    return [];
  }
  return (data ?? []).map(rowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getProductBySlug error:", error.message);
    return null;
  }
  return data ? rowToProduct(data) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getProductById error:", error.message);
    return null;
  }
  return data ? rowToProduct(data) : null;
}

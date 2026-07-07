"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase, getServerUser } from "@/lib/supabase-server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, ProductInsert } from "@/lib/supabase";
import { normalizeProductPrice, parseNprPrice } from "@/lib/price";

const BUCKET = "product-images";

export type ActionState = { error?: string };

type DbClient = SupabaseClient<Database>;

/**
 * Every mutating action re-verifies the session server-side (defense in depth —
 * the proxy is the first gate, but per Next 16 guidance Server Functions must
 * check auth themselves too). All writes use the user's authenticated session
 * via cookies, so RLS authorises them. The service-role key is never used.
 */
async function requireAuth() {
  const user = await getServerUser();
  if (!user) redirect("/admin/login");
}

function parseForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const material = String(formData.get("material") ?? "").trim();
  const size = String(formData.get("size") ?? "").trim();
  const inStock = formData.get("inStock") != null;
  const benefits = String(formData.get("benefits") ?? "")
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return { name, slug, priceRaw, description, material, size, inStock, benefits };
}

function validate(fields: ReturnType<typeof parseForm>): string | null {
  if (!fields.name) return "Name is required.";
  if (!fields.slug) return "Slug is required.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.slug)) {
    return "Slug must be lowercase letters, numbers, and hyphens only.";
  }
  const price = parseNprPrice(fields.priceRaw);
  if (price === null) {
    return "Price must be a whole number of 0 or more.";
  }
  return null;
}

async function uploadImages(
  supabase: DbClient,
  slug: string,
  files: File[],
): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
    const path = `${slug}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type || undefined, upsert: false });
    if (error) throw new Error(`Image upload failed: ${error.message}`);
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

async function uploadBlogCover(
  supabase: DbClient,
  slug: string,
  file: File,
): Promise<string> {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `blog/${slug}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (error) throw new Error(`Cover image upload failed: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function resolveBlogCoverImage(
  supabase: DbClient,
  slug: string,
  formData: FormData,
  fallback: string | null,
): Promise<{ coverImage: string | null; error?: string }> {
  const urlField = String(formData.get("coverImage") ?? "").trim() || null;
  const file = formData.get("coverImageFile");

  if (file instanceof File && file.size > 0) {
    try {
      return { coverImage: await uploadBlogCover(supabase, slug, file) };
    } catch (e) {
      return {
        coverImage: fallback,
        error: e instanceof Error ? e.message : "Cover image upload failed.",
      };
    }
  }

  if (urlField) return { coverImage: urlField };
  return { coverImage: fallback };
}

/** Extract the storage object path from a public URL (null if not our bucket). */
function storagePathFromUrl(url: string): string | null {
  const marker = `/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

export async function createProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();
  const fields = parseForm(formData);
  const validationError = validate(fields);
  if (validationError) return { error: validationError };

  const supabase = await createServerSupabase();

  let imageUrls: string[] = [];
  try {
    const files = formData.getAll("images").filter((f): f is File => f instanceof File);
    imageUrls = await uploadImages(supabase, fields.slug, files);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image upload failed." };
  }

  const insert: ProductInsert = {
    slug: fields.slug,
    name: fields.name,
    price: normalizeProductPrice(fields.priceRaw),
    description: fields.description,
    benefits: fields.benefits.length ? fields.benefits : [],
    material: fields.material || null,
    size: fields.size || null,
    images: imageUrls,
    in_stock: fields.inStock,
  };

  const { error } = await supabase.from("products").insert(insert);
  if (error) {
    return {
      error:
        error.code === "23505"
          ? "A product with that slug already exists."
          : error.message,
    };
  }

  revalidatePath("/admin");
  revalidatePath("/shop");
  redirect("/admin");
}

export async function updateProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing product id." };

  const fields = parseForm(formData);
  const validationError = validate(fields);
  if (validationError) return { error: validationError };

  const supabase = await createServerSupabase();

  // Images that the admin chose to keep (hidden inputs), plus any new uploads.
  const keptImages = formData
    .getAll("existingImages")
    .map((v) => String(v))
    .filter(Boolean);

  let newImageUrls: string[] = [];
  try {
    const files = formData.getAll("images").filter((f): f is File => f instanceof File);
    newImageUrls = await uploadImages(supabase, fields.slug, files);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image upload failed." };
  }

  const { error } = await supabase
    .from("products")
    .update({
      slug: fields.slug,
      name: fields.name,
      price: normalizeProductPrice(fields.priceRaw),
      description: fields.description,
      benefits: fields.benefits.length ? fields.benefits : [],
      material: fields.material || null,
      size: fields.size || null,
      images: [...keptImages, ...newImageUrls],
      in_stock: fields.inStock,
    })
    .eq("id", id);

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "A product with that slug already exists."
          : error.message,
    };
  }

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath(`/shop/${fields.slug}`);
  redirect("/admin");
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createServerSupabase();

  // Best-effort: remove the product's storage images first.
  const { data: existing } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  if (existing?.images?.length) {
    const paths = existing.images
      .map(storagePathFromUrl)
      .filter((p): p is string => p !== null);
    if (paths.length) {
      await supabase.storage.from(BUCKET).remove(paths);
    }
  }

  await supabase.from("products").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function logout(): Promise<void> {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}


// ─── Advisor actions ─────────────────────────────────────────────────────────

const ADVISOR_BUCKET = "advisor-images";

function parseAdvisorForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").trim();
  const languages = String(formData.get("languages") ?? "")
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);
  const isActive = formData.get("isActive") != null;
  return { name, role, whatsappNumber, languages, isActive };
}

async function uploadAdvisorPhoto(
  supabase: DbClient,
  name: string,
  file: File,
): Promise<string> {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `${slug}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(ADVISOR_BUCKET)
    .upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (error) throw new Error(`Photo upload failed: ${error.message}`);
  const { data } = supabase.storage.from(ADVISOR_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createAdvisor(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();
  const fields = parseAdvisorForm(formData);
  if (!fields.name) return { error: "Name is required." };

  const supabase = await createServerSupabase();

  let photoUrl: string | null = null;
  try {
    const file = formData.get("photo");
    if (file instanceof File && file.size > 0) {
      photoUrl = await uploadAdvisorPhoto(supabase, fields.name, file);
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Photo upload failed." };
  }

  const { error } = await supabase.from("advisors").insert({
    name: fields.name,
    role: fields.role,
    photo: photoUrl,
    whatsapp_number: fields.whatsappNumber,
    languages: fields.languages.length ? fields.languages : ["Nepali", "Hindi", "English"],
    is_active: fields.isActive,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/advisors");
  revalidatePath("/");
  redirect("/admin/advisors");
}

export async function updateAdvisor(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return { error: "Missing advisor id." };

  const fields = parseAdvisorForm(formData);
  if (!fields.name) return { error: "Name is required." };

  const supabase = await createServerSupabase();

  // Keep existing photo unless a new one is uploaded.
  let photoUrl: string | null =
    String(formData.get("existingPhoto") ?? "") || null;
  try {
    const file = formData.get("photo");
    if (file instanceof File && file.size > 0) {
      photoUrl = await uploadAdvisorPhoto(supabase, fields.name, file);
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Photo upload failed." };
  }

  const { error } = await supabase
    .from("advisors")
    .update({
      name: fields.name,
      role: fields.role,
      photo: photoUrl,
      whatsapp_number: fields.whatsappNumber,
      languages: fields.languages.length ? fields.languages : ["Nepali", "Hindi", "English"],
      is_active: fields.isActive,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/advisors");
  revalidatePath("/");
  redirect("/admin/advisors");
}

export async function deleteAdvisor(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createServerSupabase();

  // Best-effort: remove photo from storage.
  const { data: existing } = await supabase
    .from("advisors")
    .select("photo")
    .eq("id", id)
    .maybeSingle();

  if (existing?.photo) {
    const marker = `/${ADVISOR_BUCKET}/`;
    const i = existing.photo.indexOf(marker);
    if (i !== -1) {
      const path = existing.photo.slice(i + marker.length);
      await supabase.storage.from(ADVISOR_BUCKET).remove([path]);
    }
  }

  await supabase.from("advisors").delete().eq("id", id);

  revalidatePath("/admin/advisors");
  revalidatePath("/");
}


// ─── Blog post actions ────────────────────────────────────────────────────────

function parseBlogForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const published = formData.get("published") != null;
  return { title, slug, excerpt, content, coverImage, published };
}

export async function createBlogPost(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();
  const fields = parseBlogForm(formData);
  if (!fields.title) return { error: "Title is required." };
  if (!fields.slug) return { error: "Slug is required." };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.slug)) {
    return { error: "Slug must be lowercase letters, numbers, and hyphens only." };
  }

  const supabase = await createServerSupabase();
  const { coverImage, error: uploadError } = await resolveBlogCoverImage(
    supabase,
    fields.slug,
    formData,
    null,
  );
  if (uploadError) return { error: uploadError };

  const { error } = await supabase.from("blog_posts").insert({
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt,
    content: fields.content,
    cover_image: coverImage,
    published: fields.published,
  });

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "A post with that slug already exists."
          : error.message,
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return { error: "Missing post id." };

  const fields = parseBlogForm(formData);
  if (!fields.title) return { error: "Title is required." };
  if (!fields.slug) return { error: "Slug is required." };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.slug)) {
    return { error: "Slug must be lowercase letters, numbers, and hyphens only." };
  }

  const supabase = await createServerSupabase();
  const existingCover =
    String(formData.get("existingCoverImage") ?? "").trim() || fields.coverImage;
  const { coverImage, error: uploadError } = await resolveBlogCoverImage(
    supabase,
    fields.slug,
    formData,
    existingCover,
  );
  if (uploadError) return { error: uploadError };

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt,
      content: fields.content,
      cover_image: coverImage,
      published: fields.published,
    })
    .eq("id", id);

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "A post with that slug already exists."
          : error.message,
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${fields.slug}`);
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createServerSupabase();
  await supabase.from("blog_posts").delete().eq("id", id);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}

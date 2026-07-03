-- =============================================================================
-- Pyramid Vastu Yantra — Supabase schema, RLS, and Storage setup
-- =============================================================================
-- Run this in the Supabase Dashboard → SQL Editor (New query → paste → Run).
-- Safe to re-run: it drops/recreates policies and uses IF NOT EXISTS / ON
-- CONFLICT guards so repeated runs won't error.
--
-- Security model (per architecture.md):
--   • products  → PUBLIC read (anon), WRITE restricted to authenticated users
--   • storage   → PUBLIC read of product images, UPLOAD/UPDATE/DELETE
--                 restricted to authenticated users
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. Extensions
-- -----------------------------------------------------------------------------
create extension if not exists pgcrypto;  -- provides gen_random_uuid()


-- -----------------------------------------------------------------------------
-- 2. products table  (mirrors the Product type in architecture.md)
-- -----------------------------------------------------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  price       numeric(10, 2) not null check (price >= 0),  -- NPR
  description text not null default '',
  benefits    text[] not null default '{}',                -- Vastu/energy significance
  material    text,
  size        text,
  images      text[] not null default '{}',                -- Supabase Storage URLs
  in_stock    boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Fast lookups by slug (already unique, but explicit index for clarity)
create index if not exists products_slug_idx on public.products (slug);
-- Catalog ordering
create index if not exists products_created_at_idx on public.products (created_at desc);


-- -----------------------------------------------------------------------------
-- 3. Row Level Security on products
-- -----------------------------------------------------------------------------
alter table public.products enable row level security;

-- Public (anon + authenticated) may READ all products.
drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products
  for select
  using (true);

-- Only authenticated users may INSERT.
drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

-- Only authenticated users may UPDATE.
drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

-- Only authenticated users may DELETE.
drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products"
  on public.products
  for delete
  to authenticated
  using (true);


-- -----------------------------------------------------------------------------
-- 4. Storage bucket for product images
-- -----------------------------------------------------------------------------
-- Create a PUBLIC bucket named 'product-images' (public = anyone can read files
-- via their public URL). Writes are still controlled by the policies below.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;


-- -----------------------------------------------------------------------------
-- 5. Storage RLS policies (on storage.objects, scoped to our bucket)
-- -----------------------------------------------------------------------------
-- Public read of files in the product-images bucket.
drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

-- Authenticated users may UPLOAD into the bucket.
drop policy if exists "Authenticated upload product images" on storage.objects;
create policy "Authenticated upload product images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

-- Authenticated users may UPDATE (e.g. replace) files in the bucket.
drop policy if exists "Authenticated update product images" on storage.objects;
create policy "Authenticated update product images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

-- Authenticated users may DELETE files in the bucket.
drop policy if exists "Authenticated delete product images" on storage.objects;
create policy "Authenticated delete product images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images');


-- -----------------------------------------------------------------------------
-- 6. advisors table
-- -----------------------------------------------------------------------------
create table if not exists public.advisors (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  role             text not null default '',
  photo            text,                              -- Supabase Storage URL or path
  whatsapp_number  text not null default '',
  languages        text[] not null default '{}',
  is_active        boolean not null default true,
  created_at       timestamptz not null default now()
);

create index if not exists advisors_created_at_idx on public.advisors (created_at desc);

alter table public.advisors enable row level security;

drop policy if exists "Advisors are publicly readable" on public.advisors;
create policy "Advisors are publicly readable"
  on public.advisors for select using (true);

drop policy if exists "Authenticated can insert advisors" on public.advisors;
create policy "Authenticated can insert advisors"
  on public.advisors for insert to authenticated with check (true);

drop policy if exists "Authenticated can update advisors" on public.advisors;
create policy "Authenticated can update advisors"
  on public.advisors for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated can delete advisors" on public.advisors;
create policy "Authenticated can delete advisors"
  on public.advisors for delete to authenticated using (true);


-- -----------------------------------------------------------------------------
-- 7. Storage bucket for advisor photos
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('advisor-images', 'advisor-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read advisor images" on storage.objects;
create policy "Public read advisor images"
  on storage.objects for select
  using (bucket_id = 'advisor-images');

drop policy if exists "Authenticated upload advisor images" on storage.objects;
create policy "Authenticated upload advisor images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'advisor-images');

drop policy if exists "Authenticated update advisor images" on storage.objects;
create policy "Authenticated update advisor images"
  on storage.objects for update to authenticated
  using (bucket_id = 'advisor-images')
  with check (bucket_id = 'advisor-images');

drop policy if exists "Authenticated delete advisor images" on storage.objects;
create policy "Authenticated delete advisor images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'advisor-images');


-- -----------------------------------------------------------------------------
-- 8. Product seed data — run supabase/seed-products.sql for the 6 real
--    Jiten Pyramid products (upserts by slug). Upload real photos via /admin.
-- -----------------------------------------------------------------------------


-- -----------------------------------------------------------------------------
-- 9. blog_posts table
-- -----------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text not null default '',
  content      text not null default '',
  cover_image  text,
  published    boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_created_at_idx on public.blog_posts (created_at desc);
create index if not exists blog_posts_published_idx on public.blog_posts (published, created_at desc);


-- -----------------------------------------------------------------------------
-- 10. Row Level Security on blog_posts
-- -----------------------------------------------------------------------------
alter table public.blog_posts enable row level security;

-- Public (anon) may read PUBLISHED posts only.
drop policy if exists "Published blog posts are publicly readable" on public.blog_posts;
create policy "Published blog posts are publicly readable"
  on public.blog_posts
  for select
  using (published = true);

-- Authenticated admin may read ALL posts (including drafts).
drop policy if exists "Authenticated can read all blog posts" on public.blog_posts;
create policy "Authenticated can read all blog posts"
  on public.blog_posts
  for select
  to authenticated
  using (true);

-- Only authenticated users may INSERT.
drop policy if exists "Authenticated can insert blog posts" on public.blog_posts;
create policy "Authenticated can insert blog posts"
  on public.blog_posts
  for insert
  to authenticated
  with check (true);

-- Only authenticated users may UPDATE.
drop policy if exists "Authenticated can update blog posts" on public.blog_posts;
create policy "Authenticated can update blog posts"
  on public.blog_posts
  for update
  to authenticated
  using (true)
  with check (true);

-- Only authenticated users may DELETE.
drop policy if exists "Authenticated can delete blog posts" on public.blog_posts;
create policy "Authenticated can delete blog posts"
  on public.blog_posts
  for delete
  to authenticated
  using (true);

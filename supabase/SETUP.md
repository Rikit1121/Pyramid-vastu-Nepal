# Supabase Setup — Pyramid Vastu Yantra

Manual steps to bring the backend online. Do these once in the Supabase
dashboard for project `zzbcicqihwuljxbsdqrn`.

---

## 1. Environment variables

Already configured in `.env.local` (not committed — `.gitignore` excludes `.env*`):

| Variable | Key type | Where it's used |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | `lib/supabase.ts` (client + server) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Publishable** key | `lib/supabase.ts` — browser-safe, RLS-constrained |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** key | Server-only (Phase 8). **Never** import into client code. |

> After editing `.env.local`, **restart `npm run dev`** — Next.js only reads it at startup.

On **Vercel**, add the same three variables under Project → Settings → Environment Variables before deploying.

---

## 2. Run the schema SQL

1. Supabase Dashboard → **SQL Editor** → **New query**
2. Paste the full contents of [`supabase/schema.sql`](./schema.sql)
3. Click **Run**

This creates the `products` table, enables RLS with the correct policies, creates
the `product-images` storage bucket, and adds storage access policies. The script
is **idempotent** — safe to run again if you change it later.

---

## 3. Verify the storage bucket

The SQL creates the `product-images` bucket automatically. Confirm it:

- Dashboard → **Storage** → you should see a **`product-images`** bucket marked **Public**.
- If it's missing (e.g. your project restricts bucket creation via SQL), create it
  manually: **New bucket** → name `product-images` → toggle **Public bucket** ON →
  Save. The storage *policies* from the SQL will still apply.

---

## 4. Create the admin user (for Phase 8)

No public sign-up — a single admin user, created by you:

1. Dashboard → **Authentication** → **Users** → **Add user** → **Create new user**
2. Enter the admin email + a strong password, and (recommended) check
   **Auto Confirm User** so no email verification is needed.
3. This is the account that will log in at `/admin` in Phase 8.

**Recommended:** Authentication → **Providers** → **Email** → disable
**"Allow new users to sign up"** so the public can't self-register. Only you can
add admin users from the dashboard.

---

## 5. (Optional) Seed the products table

Two options to get real rows in:

- **Now:** uncomment the seed block at the bottom of `schema.sql` and re-run it, **or**
- **Phase 8:** add products through the admin UI (preferred — it also handles image uploads).

Until then, `/shop` and `/shop/[slug]` keep reading from `lib/products.ts`
placeholder data. That swap to live Supabase data happens in **Phase 8**.

---

## Security checklist

- [x] RLS **enabled** on `products` — public read, authenticated-only writes.
- [x] Storage: public read, authenticated-only upload/update/delete.
- [x] Anon/publishable key is the only key in client code; **secret key never exposed**.
- [ ] **Rotate the secret key** if it was shared anywhere insecure
      (Dashboard → Settings → API → roll key), then update `.env.local` + Vercel.
- [ ] Disable public sign-ups (step 4) so only you can create admin accounts.

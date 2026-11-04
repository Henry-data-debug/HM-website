/*
# Create testimonials table

1. New Tables
- `testimonials`: client testimonials displayed publicly on the website.
  - id (uuid, primary key)
  - name (text, not null) — client's full name
  - role (text) — job title, e.g. "Operations Director"
  - company (text) — company name
  - rating (int, not null, default 5, check 1-5) — star rating
  - quote (text, not null) — the testimonial body
  - initials (text) — avatar monogram, derived client-side or stored
  - gradient (text) — tailwind gradient classes for avatar
  - sort_order (int, default 0) — admin-controlled display order
  - is_published (boolean, default true) — admin can hide a testimonial
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on testimonials.
- Public visitors (anon + authenticated) can SELECT published testimonials
  so they render on the public site without login.
- Only authenticated (admin) users can INSERT/UPDATE/DELETE testimonials.

3. Important Notes
- This is a hybrid table: public read of published rows, admin-only writes.
- SELECT policy uses `is_published = true` so admin can draft/hide entries.
- No user_id column — the admin is the single authenticated operator.
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  company text,
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  quote text NOT NULL,
  initials text,
  gradient text NOT NULL DEFAULT 'from-electric-500 to-electric-700',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public can read published testimonials
DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
CREATE POLICY "public_read_testimonials"
ON testimonials FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Only authenticated admin can insert
DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials"
ON testimonials FOR INSERT
TO authenticated WITH CHECK (true);

-- Only authenticated admin can update
DROP POLICY IF EXISTS "auth_update_testimonials" ON testimonials;
CREATE POLICY "auth_update_testimonials"
ON testimonials FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated admin can delete
DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials"
ON testimonials FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_testimonials_sort ON testimonials (sort_order, created_at DESC);

/*
# Create contact submissions and newsletter subscribers tables

1. New Tables
- `contact_submissions`: stores inquiries submitted through the website contact form.
  - id (uuid, primary key)
  - name (text, not null) — full name of the enquirer
  - email (text, not null) — contact email address
  - phone (text) — optional phone number
  - company (text) — optional company name
  - service_required (text) — which service the lead is interested in
  - message (text, not null) — the inquiry body
  - status (text, default 'new') — lead status for future admin triage
  - created_at (timestamptz, default now())
- `newsletter_subscribers`: stores email addresses from footer newsletter signups.
  - id (uuid, primary key)
  - email (text, unique, not null) — subscriber email
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- This is a no-auth public marketing site, so policies allow `anon, authenticated`
  to INSERT (the public submits forms) and the owner of each row is not relevant.
  SELECT/UPDATE/DELETE are intentionally restricted to `authenticated` only so
  that submitted leads and subscriber emails cannot be scraped via the anon key.
- contact_submissions: anon can INSERT only; authenticated can SELECT/UPDATE/DELETE.
- newsletter_subscribers: anon can INSERT only; authenticated can SELECT/UPDATE/DELETE.

3. Important Notes
- No user_id / auth.users linkage — this is a single-tenant marketing site with no sign-in.
- UNIQUE constraint on newsletter_subscribers.email prevents duplicate subscriptions.
- An index on contact_submissions.created_at supports chronological admin listing.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_required text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- contact_submissions: public can insert; only authenticated can read/update/delete
DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contact" ON contact_submissions;
CREATE POLICY "auth_select_contact"
ON contact_submissions FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_contact" ON contact_submissions;
CREATE POLICY "auth_update_contact"
ON contact_submissions FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contact" ON contact_submissions;
CREATE POLICY "auth_delete_contact"
ON contact_submissions FOR DELETE
TO authenticated USING (true);

-- newsletter_subscribers: public can subscribe; only authenticated can read/update/delete
DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter"
ON newsletter_subscribers FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_select_newsletter"
ON newsletter_subscribers FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_update_newsletter"
ON newsletter_subscribers FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_delete_newsletter"
ON newsletter_subscribers FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
ON contact_submissions (created_at DESC);

/*
# Create quote_requests table

1. New Tables
- `quote_requests`: project quote requests submitted via the "Get a Quote" form.
  - id (uuid, primary key)
  - name (text, not null) — requester full name
  - email (text, not null) — contact email
  - phone (text) — optional phone
  - company (text) — optional company
  - service (text, not null) — requested service category
  - budget (text) — optional budget range
  - timeline (text) — optional preferred timeline
  - description (text, not null) — project description
  - status (text, default 'new') — admin triage status
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on quote_requests.
- Public visitors (anon + authenticated) can INSERT (anyone can request a quote).
- Only authenticated (admin) users can SELECT/UPDATE/DELETE quotes.
  This prevents scraping of lead data via the anon key.

3. Important Notes
- No user_id column — single admin operator model.
- An index on created_at supports chronological admin listing.
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text NOT NULL,
  budget text,
  timeline text,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Public can submit a quote request
DROP POLICY IF EXISTS "anon_insert_quote" ON quote_requests;
CREATE POLICY "anon_insert_quote"
ON quote_requests FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Only authenticated admin can read
DROP POLICY IF EXISTS "auth_select_quotes" ON quote_requests;
CREATE POLICY "auth_select_quotes"
ON quote_requests FOR SELECT
TO authenticated USING (true);

-- Only authenticated admin can update
DROP POLICY IF EXISTS "auth_update_quotes" ON quote_requests;
CREATE POLICY "auth_update_quotes"
ON quote_requests FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated admin can delete
DROP POLICY IF EXISTS "auth_delete_quotes" ON quote_requests;
CREATE POLICY "auth_delete_quotes"
ON quote_requests FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at
ON quote_requests (created_at DESC);

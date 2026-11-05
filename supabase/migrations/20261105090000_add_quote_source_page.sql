ALTER TABLE quote_requests
ADD COLUMN IF NOT EXISTS source_page text NOT NULL DEFAULT '/';
/*
  # Create CMS content management tables

  1. New Tables
    - `site_content`
      - `id` (uuid, primary key)
      - `page` (text) - which page this content belongs to (e.g., 'home')
      - `section` (text) - which section (e.g., 'hero', 'about')
      - `content` (jsonb) - the actual content as JSON
      - `updated_at` (timestamptz) - last update timestamp
      - `updated_by` (uuid) - who last updated it
    - `reviews`
      - `id` (uuid, primary key)
      - `text` (text) - review text
      - `author` (text) - reviewer name
      - `source` (text) - where the review came from
      - `rating` (integer) - star rating
      - `display_order` (integer) - display order
      - `is_active` (boolean) - whether to show this review
      - `created_at` (timestamptz)
    - `reels`
      - `id` (uuid, primary key)
      - `url` (text) - Facebook reel URL
      - `display_order` (integer) - display order
      - `is_active` (boolean) - whether to show this reel
      - `created_at` (timestamptz)
    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `role` (text) - admin role
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Admin users can read/write all CMS content
    - Public (anon) users can only read published content
*/

-- Site Content table for structured page content
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id),
  UNIQUE(page, section)
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  author text NOT NULL,
  source text NOT NULL DEFAULT 'Facebook',
  rating integer NOT NULL DEFAULT 5,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Reels table
CREATE TABLE IF NOT EXISTS reels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reels ENABLE ROW LEVEL SECURITY;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- site_content: anon can read, authenticated admins can read/write
CREATE POLICY "Anyone can read site content"
  ON site_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert site content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admins can update site content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admins can delete site content"
  ON site_content FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- reviews: anon can read active, admins can CRUD
CREATE POLICY "Anyone can read active reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admins can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- reels: anon can read active, admins can CRUD
CREATE POLICY "Anyone can read active reels"
  ON reels FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can insert reels"
  ON reels FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admins can update reels"
  ON reels FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admins can delete reels"
  ON reels FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- admin_users: only admins can read, no public insert
CREATE POLICY "Admins can read admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update own record"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

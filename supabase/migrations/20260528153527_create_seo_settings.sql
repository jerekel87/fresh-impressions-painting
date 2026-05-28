/*
  # Create SEO settings table

  1. New Tables
    - `seo_settings`
      - `id` (uuid, primary key)
      - `page` (text, unique) - page identifier (global, home, about, areas, contact, services)
      - `title` (text) - page title / meta title
      - `description` (text) - meta description
      - `keywords` (text) - comma-separated keywords
      - `og_title` (text) - Open Graph title override
      - `og_description` (text) - Open Graph description override
      - `og_image` (text) - Open Graph image URL
      - `canonical_url` (text) - canonical URL for the page
      - `robots` (text) - robots meta directive (index,follow etc.)
      - `structured_data` (jsonb) - JSON-LD structured data
      - `custom_head` (text) - custom HTML to inject in head
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `seo_settings` table
    - Add policies for authenticated admin users to manage SEO settings
    - Allow public read access for rendering meta tags

  3. Notes
    - The 'global' page entry holds site-wide defaults (site name, default OG image, etc.)
    - Page-specific entries override global defaults
*/

CREATE TABLE IF NOT EXISTS seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text UNIQUE NOT NULL,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  keywords text NOT NULL DEFAULT '',
  og_title text NOT NULL DEFAULT '',
  og_description text NOT NULL DEFAULT '',
  og_image text NOT NULL DEFAULT '',
  canonical_url text NOT NULL DEFAULT '',
  robots text NOT NULL DEFAULT 'index, follow',
  structured_data jsonb DEFAULT '{}',
  custom_head text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read SEO settings"
  ON seo_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated admins can insert SEO settings"
  ON seo_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can update SEO settings"
  ON seo_settings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can delete SEO settings"
  ON seo_settings
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- Seed with global defaults and per-page entries
INSERT INTO seo_settings (page, title, description, keywords, og_title, og_description, robots) VALUES
  ('global', 'Fresh Impressions Painting | Professional Painting Services in Granbury, TX', 'Fresh Impressions Painting provides expert residential and commercial painting services across Hood, Parker, Johnson, Erath, and Somervell counties in North Central Texas.', 'painting contractor, house painter, interior painting, exterior painting, Granbury TX, Hood County, commercial painting, residential painting, Fresh Impressions Painting', 'Fresh Impressions Painting', 'Expert painting services in Granbury, TX and surrounding counties. Interior, exterior, and commercial painting with quality craftsmanship.', 'index, follow'),
  ('home', 'Fresh Impressions Painting | Expert Residential & Commercial Painting in Granbury, TX', 'Transform your space with Fresh Impressions Painting. Professional interior and exterior painting services in Granbury, TX and five surrounding North Central Texas counties. Free estimates available.', 'painting services Granbury TX, house painter near me, interior painting, exterior painting, commercial painting, residential painting, cabinet painting, deck staining', '', '', 'index, follow'),
  ('about', 'About Fresh Impressions Painting | Our Story & Values', 'Learn about Fresh Impressions Painting, founded by Ian Rosenkranz in 2022. Built on faith, driven by craft -- serving families and businesses across North Central Texas with integrity and excellence.', 'Ian Rosenkranz, Fresh Impressions Painting owner, about us, painting company values, Granbury painter, professional painter Texas', '', '', 'index, follow'),
  ('areas', 'Service Areas | Five Counties in North Central Texas', 'Fresh Impressions Painting proudly serves Hood, Parker, Johnson, Erath, and Somervell counties including Granbury, Weatherford, Cleburne, Stephenville, and Glen Rose.', 'painting services Hood County, painter Weatherford TX, painter Cleburne TX, painter Stephenville TX, painter Glen Rose TX, North Central Texas painting', '', '', 'index, follow'),
  ('contact', 'Contact Fresh Impressions Painting | Free Estimates in Granbury, TX', 'Get a free painting estimate from Fresh Impressions Painting. Call (817) 243-9116 or fill out our contact form. Serving Granbury, TX and surrounding communities.', 'contact painter Granbury, free painting estimate, painting quote Texas, Fresh Impressions Painting phone number, painting consultation', '', '', 'index, follow'),
  ('services', 'Our Painting Services | Interior, Exterior & Commercial', 'Explore our full range of professional painting services including interior painting, exterior painting, cabinet refinishing, deck staining, and commercial projects.', 'interior painting services, exterior house painting, cabinet painting, deck staining, commercial painting, painting contractor services', '', '', 'index, follow')
ON CONFLICT (page) DO NOTHING;

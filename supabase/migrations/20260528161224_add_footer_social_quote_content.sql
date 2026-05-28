/*
  # Add footer, social links, and quote section content

  1. New site_content entries
    - `global` / `social_links` - social media URLs (Facebook, Instagram, Nextdoor, etc.)
    - `global` / `footer` - footer text, description, CTA headline/button
    - `global` / `quote_section` - "Request a Free Quote" section headline and subtitle

  2. Notes
    - Uses existing site_content table structure
    - Stores structured JSON for each section
    - Editable from the admin panel
*/

INSERT INTO site_content (page, section, content)
VALUES (
  'global',
  'social_links',
  '{
    "facebook": "https://www.facebook.com/freshimpressionspainting",
    "instagram": "https://www.instagram.com/freshimpressionspainting",
    "nextdoor": "https://nextdoor.com",
    "google": "",
    "yelp": "",
    "tiktok": ""
  }'::jsonb
)
ON CONFLICT DO NOTHING;

INSERT INTO site_content (page, section, content)
VALUES (
  'global',
  'footer',
  '{
    "description": "Expert residential and commercial painting across North Central Texas. Quality craftsmanship, lasting results.",
    "cta_headline": "Let''s start your project.",
    "cta_subtitle": "Get a free, no-obligation estimate for your next painting project.",
    "cta_button_text": "REQUEST ESTIMATE",
    "copyright": "Fresh Impressions Painting"
  }'::jsonb
)
ON CONFLICT DO NOTHING;

INSERT INTO site_content (page, section, content)
VALUES (
  'global',
  'quote_section',
  '{
    "headline": "Request a",
    "headline_accent": "free quote.",
    "subtitle": "Fill out the form below and we''ll be in touch shortly."
  }'::jsonb
)
ON CONFLICT DO NOTHING;

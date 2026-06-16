ALTER TABLE services
  ADD COLUMN IF NOT EXISTS gallery_images jsonb NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS about_image text DEFAULT NULL;

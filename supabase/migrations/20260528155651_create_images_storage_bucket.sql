/*
  # Create images storage bucket

  1. Changes
    - Creates a public storage bucket called 'images' for admin-uploaded media
    - Sets up RLS policies for authenticated upload and public read access

  2. Notes
    - Public read allows images to be served on the frontend
    - Only authenticated admin users can upload/delete images
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated admins can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'images'
    AND EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'images'
    AND EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    bucket_id = 'images'
    AND EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'images'
    AND EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

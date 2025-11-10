-- Make onsen-images bucket private to prevent file enumeration
-- Images will still be accessible via their public URLs
UPDATE storage.buckets 
SET public = false 
WHERE id = 'onsen-images';

-- Ensure proper storage policies for admin/editor upload access
-- and public read access to specific files remain in place
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Admins and editors can upload images" ON storage.objects;
  DROP POLICY IF EXISTS "Admins and editors can update images" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can view onsen images" ON storage.objects;
  
  -- Recreate policies for proper access control
  CREATE POLICY "Admins and editors can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'onsen-images' 
    AND (
      public.has_role(auth.uid(), 'admin'::app_role) 
      OR public.has_role(auth.uid(), 'editor'::app_role)
    )
  );

  CREATE POLICY "Admins and editors can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'onsen-images' 
    AND (
      public.has_role(auth.uid(), 'admin'::app_role) 
      OR public.has_role(auth.uid(), 'editor'::app_role)
    )
  );

  CREATE POLICY "Anyone can view onsen images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'onsen-images');
END $$;
/*
  # Add storage bucket for profile photos

  1. Storage
    - Create storage bucket for profile photos
    - Set up public access policy
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public access to the bucket
CREATE POLICY "Public Access"
ON storage.objects
FOR ALL
TO public
USING (bucket_id = 'profile-photos')
WITH CHECK (bucket_id = 'profile-photos');
/*
  # Update RLS policies for authenticated access

  1. Changes
    - Remove public access policy from clientes table
    - Add authenticated users only policy for clientes table
    - Add authenticated users only policy for profile-photos storage

  2. Security
    - Only authenticated users can perform CRUD operations on clientes
    - Only authenticated users can upload and manage profile photos
*/

-- Remove existing public policy
DROP POLICY IF EXISTS "Allow public access" ON clientes;

-- Create new authenticated-only policy
CREATE POLICY "Allow authenticated access"
ON clientes
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Update storage policies
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own objects" ON storage.objects;

-- Create new storage policies for authenticated users only
CREATE POLICY "Allow authenticated read access"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'profile-photos');

CREATE POLICY "Allow authenticated upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-photos');

CREATE POLICY "Allow authenticated update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-photos');

CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-photos');
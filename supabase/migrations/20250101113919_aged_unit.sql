/*
  # Add photo support
  
  1. Changes
    - Add foto_url column to clientes table
  
  2. Security
    - Column allows NULL values for optional photos
*/

ALTER TABLE clientes ADD COLUMN IF NOT EXISTS foto_url text;
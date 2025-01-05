/*
  # Create facturas table and related security policies

  1. New Tables
    - `facturas`
      - `id` (uuid, primary key)
      - `cliente_id` (uuid, foreign key to clientes)
      - `numero` (text, unique)
      - `fecha` (date)
      - `lineas` (jsonb array)
      - `observaciones` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `facturas` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS facturas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  numero text UNIQUE NOT NULL,
  fecha date NOT NULL,
  lineas jsonb NOT NULL,
  observaciones text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated access to facturas"
  ON facturas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_facturas_updated_at
  BEFORE UPDATE ON facturas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
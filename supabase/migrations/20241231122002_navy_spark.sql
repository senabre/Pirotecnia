/*
  # Create clientes table

  1. New Tables
    - `clientes`
      - `id` (uuid, primary key)
      - `nombre` (text)
      - `direccion` (text)
      - `provincia` (text)
      - `poblacion` (text)
      - `tipo_acto` (text)
      - `dia_disparo` (date)
      - `lugar_disparo` (text)
      - `hora_disparo` (time)
      - `materiales_varios` (text, nullable)
      - `observaciones` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `clientes` table
    - Add policies for authenticated users to perform all operations
*/

CREATE TABLE IF NOT EXISTS clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  direccion text NOT NULL,
  provincia text NOT NULL,
  poblacion text NOT NULL,
  tipo_acto text NOT NULL,
  dia_disparo date NOT NULL,
  lugar_disparo text NOT NULL,
  hora_disparo time NOT NULL,
  materiales_varios text,
  observaciones text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations for authenticated users"
  ON clientes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_clientes_updated_at
  BEFORE UPDATE ON clientes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
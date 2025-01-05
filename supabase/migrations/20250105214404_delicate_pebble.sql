/*
  # Add client code and improve invoice system

  1. Changes
    - Add client_code column to clientes table
    - Create sequence for automatic client codes
    - Add trigger to auto-generate client codes
*/

-- Create sequence for client codes
CREATE SEQUENCE IF NOT EXISTS client_code_seq START 1000;

-- Add client_code column
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS client_code text UNIQUE DEFAULT 'C-' || nextval('client_code_seq')::text;

-- Create trigger function for client code
CREATE OR REPLACE FUNCTION generate_client_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.client_code := 'C-' || nextval('client_code_seq')::text;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER set_client_code
  BEFORE INSERT ON clientes
  FOR EACH ROW
  EXECUTE FUNCTION generate_client_code();
/*
  # Actualizar políticas RLS para acceso público
  
  1. Cambios
    - Modificar la política existente para permitir acceso público
    - Habilitar todas las operaciones CRUD sin autenticación
  
  2. Seguridad
    - Permitir acceso público a la tabla clientes
    - Habilitar operaciones sin restricciones
*/

DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON clientes;

CREATE POLICY "Allow public access"
  ON clientes
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
/*
  # Añadir campo de foto para clientes
  
  1. Cambios
    - Añadir columna foto_url para almacenar la URL de la imagen
  
  2. Notas
    - Campo opcional para mantener compatibilidad con registros existentes
*/

ALTER TABLE clientes ADD COLUMN IF NOT EXISTS foto_url text;
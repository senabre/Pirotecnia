// Cache para almacenar las poblaciones por provincia
const poblacionesCache: Record<string, string[]> = {};

export async function getPoblaciones(provincia: string): Promise<string[]> {
  // Si ya tenemos las poblaciones en caché, las devolvemos
  if (poblacionesCache[provincia]) {
    return poblacionesCache[provincia];
  }

  try {
    // Simulamos algunas poblaciones para pruebas
    // En producción, aquí iría la llamada real a la API del INE
    const poblacionesSimuladas = [
      'Capital',
      'Ciudad Principal',
      'Pueblo Grande',
      'Villa Pequeña',
      'Municipio Central'
    ].map(base => `${base} de ${provincia}`);

    // Guardamos en caché
    poblacionesCache[provincia] = poblacionesSimuladas;
    
    return poblacionesSimuladas;
  } catch (error) {
    console.error('Error al obtener poblaciones:', error);
    return [];
  }
}
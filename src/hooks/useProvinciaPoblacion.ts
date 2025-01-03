import { useState, useEffect } from 'react';
import { getPoblaciones } from '../lib/geocoding';

export function useProvinciaPoblacion(provincia: string) {
  const [poblaciones, setPoblaciones] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!provincia) {
      setPoblaciones([]);
      return;
    }

    let isMounted = true;
    setLoading(true);

    getPoblaciones(provincia)
      .then((nuevasPoblaciones) => {
        if (isMounted) {
          // Filter out any undefined or null values and ensure unique values
          const validPoblaciones = [...new Set(nuevasPoblaciones.filter(Boolean))];
          setPoblaciones(validPoblaciones);
        }
      })
      .catch((error) => {
        console.error('Error al cargar poblaciones:', error);
        if (isMounted) {
          setPoblaciones([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [provincia]);

  return { poblaciones, loading };
}
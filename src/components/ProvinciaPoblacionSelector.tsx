import React from 'react';
import { useProvinciaPoblacion } from '../hooks/useProvinciaPoblacion';
import { SelectField } from './ui/SelectField';
import { provincias } from '../data/provincias';

interface ProvinciaPoblacionSelectorProps {
  provinciaSeleccionada: string;
  poblacionSeleccionada: string;
  onProvinciaChange: (provincia: string) => void;
  onPoblacionChange: (poblacion: string) => void;
}

export default function ProvinciaPoblacionSelector({
  provinciaSeleccionada,
  poblacionSeleccionada,
  onProvinciaChange,
  onPoblacionChange
}: ProvinciaPoblacionSelectorProps) {
  const { poblaciones, loading } = useProvinciaPoblacion(provinciaSeleccionada);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField
        label="Provincia"
        value={provinciaSeleccionada}
        onChange={(e) => onProvinciaChange(e.target.value)}
        required
      >
        <option key="provincia-default" value="">Selecciona una provincia</option>
        {provincias.map((provincia) => (
          <option key={`provincia-${provincia}`} value={provincia}>
            {provincia}
          </option>
        ))}
      </SelectField>

      <SelectField
        label="Población"
        value={poblacionSeleccionada}
        onChange={(e) => onPoblacionChange(e.target.value)}
        disabled={!provinciaSeleccionada || loading}
        required
      >
        <option key="poblacion-default" value="">
          {loading ? 'Cargando poblaciones...' : 'Selecciona una población'}
        </option>
        {poblaciones.map((poblacion) => (
          <option key={`poblacion-${poblacion}`} value={poblacion}>
            {poblacion}
          </option>
        ))}
      </SelectField>
    </div>
  );
}
import React from 'react';
import type { FiltrosCliente } from '../types/types';

interface FiltrosFormProps {
  filtros: FiltrosCliente;
  setFiltros: (filtros: FiltrosCliente) => void;
  provincias: string[];
  tiposActo: string[];
}

export default function FiltrosForm({ filtros, setFiltros, provincias, tiposActo }: FiltrosFormProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Provincia</label>
          <select
            value={filtros.provincia || ''}
            onChange={(e) => setFiltros({ ...filtros, provincia: e.target.value || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            {provincias.map(provincia => (
              <option key={provincia} value={provincia}>{provincia}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Acto</label>
          <select
            value={filtros.tipoActo || ''}
            onChange={(e) => setFiltros({ ...filtros, tipoActo: e.target.value || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {tiposActo.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            value={filtros.fechaInicio || ''}
            onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input
            type="date"
            value={filtros.fechaFin || ''}
            onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setFiltros({})}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
}
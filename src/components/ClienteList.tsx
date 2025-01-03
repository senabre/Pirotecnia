import React, { useState } from 'react';
import { Eye, Edit2, Trash2, Filter, User } from 'lucide-react';
import type { Cliente, FiltrosCliente } from '../types/types';
import ClienteDetalles from './ClienteDetalles';
import FiltrosForm from './FiltrosForm';

interface ClienteListProps {
  clientes: Cliente[];
  onEdit?: (cliente: Cliente) => void;
  onDelete?: (id: string) => void;
  viewOnly?: boolean;
}

export default function ClienteList({ clientes, onEdit, onDelete, viewOnly = false }: ClienteListProps) {
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [showFiltros, setShowFiltros] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosCliente>({});
  
  const clientesFiltrados = clientes.filter(cliente => {
    if (filtros.provincia && cliente.provincia !== filtros.provincia) return false;
    if (filtros.tipoActo && cliente.tipoActo !== filtros.tipoActo) return false;
    if (filtros.fechaInicio && cliente.diaDisparo < filtros.fechaInicio) return false;
    if (filtros.fechaFin && cliente.diaDisparo > filtros.fechaFin) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFiltros(!showFiltros)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </button>
      </div>

      {showFiltros && (
        <FiltrosForm
          filtros={filtros}
          setFiltros={setFiltros}
          provincias={[...new Set(clientes.map(c => c.provincia))]}
          tiposActo={[...new Set(clientes.map(c => c.tipoActo))]}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Acto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {cliente.fotoUrl ? (
                      <img
                        src={cliente.fotoUrl}
                        alt={cliente.nombre}
                        className="h-10 w-10 rounded-full mr-3 object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                    <span className="font-medium">{cliente.nombre}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cliente.poblacion}, {cliente.provincia}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{cliente.tipoActo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(cliente.diaDisparo).toLocaleDateString()} {cliente.horaDisparo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedCliente(cliente)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Ver detalles"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {!viewOnly && (
                      <>
                        <button
                          onClick={() => onEdit?.(cliente)}
                          className="text-green-600 hover:text-green-800"
                          title="Editar"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onDelete?.(cliente.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full">
            <ClienteDetalles
              cliente={selectedCliente}
              onClose={() => setSelectedCliente(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
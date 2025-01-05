import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useClientes } from '../../hooks/useClientes';
import type { Cliente } from '../../types/types';

interface ClienteSelectorProps {
  onSelect: (cliente: Cliente) => void;
  onCancel: () => void;
}

export default function ClienteSelector({ onSelect, onCancel }: ClienteSelectorProps) {
  const { clientes } = useClientes();
  const [search, setSearch] = useState('');

  const filteredClientes = clientes.filter(cliente => 
    cliente.client_code?.toLowerCase().includes(search.toLowerCase()) ||
    cliente.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Seleccionar Cliente</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cliente.client_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cliente.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onSelect(cliente)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
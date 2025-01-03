import React from 'react';
import { Plus, Image } from 'lucide-react';
import type { Cliente } from '../types/types';
import ImageUpload from './ImageUpload';
import ProvinciaPoblacionSelector from './ProvinciaPoblacionSelector';

interface ClienteFormProps {
  cliente: Cliente;
  setCliente: (cliente: Cliente) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

export default function ClienteForm({ cliente, setCliente, onSubmit, isEditing }: ClienteFormProps) {
  const handleImageUpload = (url: string) => {
    setCliente({ ...cliente, fotoUrl: url });
  };

  const handleImageRemove = () => {
    setCliente({ ...cliente, fotoUrl: undefined });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <ImageUpload
            currentImageUrl={cliente.fotoUrl}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={cliente.nombre}
            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            value={cliente.direccion}
            onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <ProvinciaPoblacionSelector
            provinciaSeleccionada={cliente.provincia}
            poblacionSeleccionada={cliente.poblacion}
            onProvinciaChange={(provincia) => setCliente({ ...cliente, provincia, poblacion: '' })}
            onPoblacionChange={(poblacion) => setCliente({ ...cliente, poblacion })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Acto</label>
          <input
            type="text"
            value={cliente.tipoActo}
            onChange={(e) => setCliente({ ...cliente, tipoActo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Día de Disparo</label>
          <input
            type="date"
            value={cliente.diaDisparo}
            onChange={(e) => setCliente({ ...cliente, diaDisparo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lugar de Disparo</label>
          <input
            type="text"
            value={cliente.lugarDisparo}
            onChange={(e) => setCliente({ ...cliente, lugarDisparo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hora de Disparo</label>
          <input
            type="time"
            value={cliente.horaDisparo}
            onChange={(e) => setCliente({ ...cliente, horaDisparo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Materiales Varios</label>
          <textarea
            value={cliente.materialesVarios}
            onChange={(e) => setCliente({ ...cliente, materialesVarios: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Observaciones</label>
          <textarea
            value={cliente.observaciones}
            onChange={(e) => setCliente({ ...cliente, observaciones: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isEditing ? (
            <>
              <Image className="h-4 w-4 mr-2" />
              Actualizar
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Crear
            </>
          )}
        </button>
      </div>
    </form>
  );
}
import React from 'react';
import { User } from 'lucide-react';
import type { Cliente } from '../types/types';

interface ClienteDetallesProps {
  cliente: Cliente;
  onClose: () => void;
}

export default function ClienteDetalles({ cliente, onClose }: ClienteDetallesProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ficha de Cliente</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          Cerrar
        </button>
      </div>

      <div className="flex justify-center mb-8">
        {cliente.fotoUrl ? (
          <img
            src={cliente.fotoUrl}
            alt={`Foto de ${cliente.nombre}`}
            className="h-48 w-48 rounded-full object-cover shadow-lg"
          />
        ) : (
          <div className="h-48 w-48 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-24 w-24 text-gray-400" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Información Personal</h3>
          <div className="mt-2 space-y-3">
            <p><span className="font-medium">Nombre:</span> {cliente.nombre}</p>
            <p><span className="font-medium">Dirección:</span> {cliente.direccion}</p>
            <p><span className="font-medium">Provincia:</span> {cliente.provincia}</p>
            <p><span className="font-medium">Población:</span> {cliente.poblacion}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Detalles del Evento</h3>
          <div className="mt-2 space-y-3">
            <p><span className="font-medium">Tipo de Acto:</span> {cliente.tipoActo}</p>
            <p><span className="font-medium">Día de Disparo:</span> {new Date(cliente.diaDisparo).toLocaleDateString()}</p>
            <p><span className="font-medium">Lugar de Disparo:</span> {cliente.lugarDisparo}</p>
            <p><span className="font-medium">Hora de Disparo:</span> {cliente.horaDisparo}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-sm font-medium text-gray-500">Materiales Varios</h3>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{cliente.materialesVarios || 'No especificado'}</p>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-sm font-medium text-gray-500">Observaciones</h3>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{cliente.observaciones || 'Sin observaciones'}</p>
        </div>
      </div>
    </div>
  );
}
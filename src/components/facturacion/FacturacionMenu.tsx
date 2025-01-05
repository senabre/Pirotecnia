import React from 'react';
import { FileText, Plus } from 'lucide-react';

interface FacturacionMenuProps {
  onNuevaFactura: () => void;
  onVerFacturas: () => void;
}

export default function FacturacionMenu({ onNuevaFactura, onVerFacturas }: FacturacionMenuProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <button
        onClick={onNuevaFactura}
        className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <Plus className="h-12 w-12 text-green-600 mb-4" />
        <span className="text-lg font-semibold text-gray-900">Nueva Factura</span>
        <span className="text-sm text-gray-500 text-center mt-2">
          Crear una nueva factura para un cliente
        </span>
      </button>

      <button
        onClick={onVerFacturas}
        className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <FileText className="h-12 w-12 text-blue-600 mb-4" />
        <span className="text-lg font-semibold text-gray-900">Ver Facturas</span>
        <span className="text-sm text-gray-500 text-center mt-2">
          Consultar y gestionar facturas existentes
        </span>
      </button>
    </div>
  );
}
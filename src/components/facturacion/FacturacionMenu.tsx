import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import FacturaForm from './FacturaForm';
import FacturaList from './FacturaList';
import ClienteSelector from './ClienteSelector';
import type { Cliente } from '../../types/types';

interface FacturacionMenuProps {
  onNuevaFactura: () => void;
  onVerFacturas: () => void;
}

export default function FacturacionMenu() {
  const [view, setView] = useState<'menu' | 'nueva' | 'lista'>('menu');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const handleNuevaFactura = async (lineas: any[], observaciones: string) => {
    try {
      if (!selectedCliente) return;
      // Implement factura creation logic here
      setView('menu');
    } catch (error) {
      console.error('Error al crear factura:', error);
      alert('Error al crear la factura');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'nueva':
        return selectedCliente ? (
          <FacturaForm
            cliente={selectedCliente}
            onSubmit={handleNuevaFactura}
            onCancel={() => setView('menu')}
          />
        ) : (
          <ClienteSelector
            onSelect={setSelectedCliente}
            onCancel={() => setView('menu')}
          />
        );
      case 'lista':
        return (
          <div className="space-y-4">
            <button
              onClick={() => setView('menu')}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Volver al menú
            </button>
            <FacturaList
              facturas={[]} // Implement fetching facturas
              onVerDetalles={() => {}}
              onDescargar={() => {}}
            />
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => setView('nueva')}
              className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Plus className="h-12 w-12 text-green-600 mb-4" />
              <span className="text-lg font-semibold text-gray-900">Nueva Factura</span>
              <span className="text-sm text-gray-500 text-center mt-2">
                Crear una nueva factura para un cliente
              </span>
            </button>

            <button
              onClick={() => setView('lista')}
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
  };

  return (
    <div className="p-4 max-h-screen overflow-y-auto">
      {renderContent()}
    </div>
  );
}
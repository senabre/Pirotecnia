import React from 'react';
import { Users, UserCog, FileText } from 'lucide-react';

interface MainMenuProps {
  onActionSelect: (action: 'list' | 'manage' | 'billing') => void;
}

export default function MainMenu({ onActionSelect }: MainMenuProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <button
        onClick={() => onActionSelect('list')}
        className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <Users className="h-12 w-12 text-blue-600 mb-4" />
        <span className="text-lg font-semibold text-gray-900">Ver Clientes</span>
        <span className="text-sm text-gray-500 text-center mt-2">
          Consultar fichas de clientes
        </span>
      </button>

      <button
        onClick={() => onActionSelect('manage')}
        className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <UserCog className="h-12 w-12 text-green-600 mb-4" />
        <span className="text-lg font-semibold text-gray-900">Gestionar Clientes</span>
        <span className="text-sm text-gray-500 text-center mt-2">
          Añadir, modificar y eliminar clientes
        </span>
      </button>

      <button
        onClick={() => onActionSelect('billing')}
        className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <FileText className="h-12 w-12 text-purple-600 mb-4" />
        <span className="text-lg font-semibold text-gray-900">Facturación</span>
        <span className="text-sm text-gray-500 text-center mt-2">
          Gestionar facturas y cobros
        </span>
      </button>
    </div>
  );
}
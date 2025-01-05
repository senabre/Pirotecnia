import React from 'react';
import { Users } from 'lucide-react';
import { signOut } from '../lib/auth';

interface HeaderProps {
  currentView: 'menu' | 'list' | 'manage';
  setCurrentView: (view: 'menu' | 'list' | 'manage') => void;
}

export default function Header({ currentView, setCurrentView }: HeaderProps) {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Users className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
      </div>
      <div className="flex items-center space-x-4">
        {currentView !== 'menu' && (
          <button
            onClick={() => setCurrentView('menu')}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Volver al Menú
          </button>
        )}
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
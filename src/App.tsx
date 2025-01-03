import React from 'react';
import { Users } from 'lucide-react';
import MainMenu from './components/MainMenu';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import { useClientes } from './hooks/useClientes';

function App() {
  const {
    clientes,
    loading,
    error,
    addCliente,
    updateCliente,
    removeCliente
  } = useClientes();

  const [currentView, setCurrentView] = React.useState<'menu' | 'list' | 'manage'>('menu');
  const [isEditing, setIsEditing] = React.useState(false);
  const [clienteActual, setClienteActual] = React.useState(clienteInicial);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateCliente(clienteActual.id, clienteActual);
      } else {
        await addCliente(clienteActual);
      }
      setClienteActual(clienteInicial);
      setIsEditing(false);
      setCurrentView('menu');
    } catch (error) {
      console.error('Error al guardar cliente:', error);
      alert('Error al guardar el cliente');
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setClienteActual(cliente);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
        await removeCliente(id);
      } catch (error) {
        console.error('Error al eliminar cliente:', error);
        alert('Error al eliminar el cliente');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error al cargar los datos: {error.message}</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'menu':
        return <MainMenu onActionSelect={setCurrentView} />;
      case 'list':
        return <ClienteList clientes={clientes} viewOnly />;
      case 'manage':
        return (
          <div className="space-y-8">
            <ClienteForm
              cliente={clienteActual}
              setCliente={setClienteActual}
              onSubmit={handleSubmit}
              isEditing={isEditing}
            />
            <ClienteList
              clientes={clientes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
            </div>
            {currentView !== 'menu' && (
              <button
                onClick={() => setCurrentView('menu')}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Volver al Menú
              </button>
            )}
          </div>

          <div className="space-y-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

const clienteInicial = {
  id: '',
  nombre: '',
  direccion: '',
  provincia: '',
  poblacion: '',
  tipoActo: '',
  diaDisparo: '',
  lugarDisparo: '',
  horaDisparo: '',
  materialesVarios: '',
  observaciones: ''
};

export default App;
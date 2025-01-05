import React from 'react';
import MainMenu from './components/MainMenu';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import FacturacionMenu from './components/facturacion/FacturacionMenu';
import { useClientes } from './hooks/useClientes';
import { useAuth } from './hooks/useAuth';

function App() {
  const { session, loading: authLoading } = useAuth();
  const {
    clientes,
    loading,
    error,
    addCliente,
    updateCliente,
    removeCliente
  } = useClientes();

  const [currentView, setCurrentView] = React.useState<'menu' | 'list' | 'manage' | 'billing'>('menu');
  const [isEditing, setIsEditing] = React.useState(false);
  const [clienteActual, setClienteActual] = React.useState(clienteInicial);

  // Show login form if not authenticated
  if (!authLoading && !session) {
    return <LoginForm onSuccess={() => {}} />;
  }

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

  if (authLoading || loading) {
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
      case 'billing':
        return (
          <FacturacionMenu
            onNuevaFactura={() => {/* TODO: Implement */}}
            onVerFacturas={() => {/* TODO: Implement */}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Header currentView={currentView} setCurrentView={setCurrentView} />
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
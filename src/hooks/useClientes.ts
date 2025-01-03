import { useState, useEffect } from 'react';
import type { Cliente } from '../types/types';
import * as api from '../lib/api';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    try {
      const data = await api.getClientes();
      setClientes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar clientes'));
    } finally {
      setLoading(false);
    }
  }

  async function addCliente(cliente: Omit<Cliente, 'id'>) {
    try {
      const newCliente = await api.createCliente(cliente);
      setClientes([newCliente, ...clientes]);
      return newCliente;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al crear cliente'));
      throw err;
    }
  }

  async function updateCliente(id: string, cliente: Partial<Cliente>) {
    try {
      const updatedCliente = await api.updateCliente(id, cliente);
      setClientes(clientes.map(c => c.id === id ? updatedCliente : c));
      return updatedCliente;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al actualizar cliente'));
      throw err;
    }
  }

  async function removeCliente(id: string) {
    try {
      await api.deleteCliente(id);
      setClientes(clientes.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al eliminar cliente'));
      throw err;
    }
  }

  return {
    clientes,
    loading,
    error,
    addCliente,
    updateCliente,
    removeCliente,
    reloadClientes: loadClientes
  };
}
import { supabase } from './supabase';
import type { Cliente } from '../types/types';

export async function getClientes() {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return data.map(transformClienteFromDB);
}

export async function createCliente(cliente: Omit<Cliente, 'id'>) {
  const clienteDB = transformClienteToDB(cliente);
  
  const { data, error } = await supabase
    .from('clientes')
    .insert([clienteDB])
    .select()
    .single();

  if (error) throw error;
  
  return transformClienteFromDB(data);
}

export async function updateCliente(id: string, cliente: Partial<Cliente>) {
  const clienteDB = transformClienteToDB(cliente);
  
  const { data, error } = await supabase
    .from('clientes')
    .update(clienteDB)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  
  return transformClienteFromDB(data);
}

export async function deleteCliente(id: string) {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Funciones auxiliares para transformar los datos
function transformClienteToDB(cliente: Partial<Cliente>) {
  return {
    nombre: cliente.nombre,
    direccion: cliente.direccion,
    provincia: cliente.provincia,
    poblacion: cliente.poblacion,
    tipo_acto: cliente.tipoActo,
    dia_disparo: cliente.diaDisparo,
    lugar_disparo: cliente.lugarDisparo,
    hora_disparo: cliente.horaDisparo,
    materiales_varios: cliente.materialesVarios,
    observaciones: cliente.observaciones,
    foto_url: cliente.fotoUrl // Añadimos el campo foto_url
  };
}

function transformClienteFromDB(data: any): Cliente {
  return {
    id: data.id,
    nombre: data.nombre,
    direccion: data.direccion,
    provincia: data.provincia,
    poblacion: data.poblacion,
    tipoActo: data.tipo_acto,
    diaDisparo: data.dia_disparo,
    lugarDisparo: data.lugar_disparo,
    horaDisparo: data.hora_disparo,
    materialesVarios: data.materiales_varios || '',
    observaciones: data.observaciones || '',
    fotoUrl: data.foto_url // Recuperamos el campo foto_url
  };
}
import { supabase } from './supabase';
import type { Factura, LineaFactura } from '../types/types';
import { generatePDF } from './pdf';

export async function getFacturas() {
  const { data, error } = await supabase
    .from('facturas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createFactura(
  clienteId: string,
  lineas: LineaFactura[],
  observaciones: string
) {
  // Generar número de factura (ejemplo simple, ajustar según necesidades)
  const fecha = new Date();
  const numero = `F${fecha.getFullYear()}${String(fecha.getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

  const factura: Omit<Factura, 'id' | 'created_at'> = {
    clienteId,
    numero,
    fecha: fecha.toISOString(),
    lineas,
    observaciones
  };

  const { data, error } = await supabase
    .from('facturas')
    .insert([factura])
    .select()
    .single();

  if (error) throw error;

  // Generar documento PDF
  const pdfBlob = await generatePDF(data);
  return { factura: data, pdf: pdfBlob };
}

export async function getFactura(id: string) {
  const { data, error } = await supabase
    .from('facturas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
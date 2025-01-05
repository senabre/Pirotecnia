export interface Cliente {
  id: string;
  nombre: string;
  direccion: string;
  provincia: string;
  poblacion: string;
  tipoActo: string;
  diaDisparo: string;
  lugarDisparo: string;
  horaDisparo: string;
  materialesVarios: string;
  observaciones: string;
  fotoUrl?: string;
}

export interface FiltrosCliente {
  provincia?: string;
  tipoActo?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

export interface LineaFactura {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  iva: number;
}

export interface Factura {
  id: string;
  clienteId: string;
  numero: string;
  fecha: string;
  lineas: LineaFactura[];
  observaciones?: string;
  created_at: string;
}
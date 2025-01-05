import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Cliente, LineaFactura } from '../../types/types';
import { formatCurrency } from '../../utils/format';

interface FacturaFormProps {
  cliente: Cliente;
  onSubmit: (lineas: LineaFactura[], observaciones: string) => Promise<void>;
}

export default function FacturaForm({ cliente, onSubmit }: FacturaFormProps) {
  const [lineas, setLineas] = useState<LineaFactura[]>([getLineaVacia()]);
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(lineas, observaciones);
  };

  const addLinea = () => {
    setLineas([...lineas, getLineaVacia()]);
  };

  const removeLinea = (index: number) => {
    setLineas(lineas.filter((_, i) => i !== index));
  };

  const updateLinea = (index: number, field: keyof LineaFactura, value: string | number) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index] = {
      ...nuevasLineas[index],
      [field]: typeof value === 'string' ? value : Number(value)
    };
    setLineas(nuevasLineas);
  };

  const calcularTotal = () => {
    return lineas.reduce((total, linea) => {
      const subtotal = linea.cantidad * linea.precioUnitario;
      const iva = subtotal * (linea.iva / 100);
      return total + subtotal + iva;
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="border-b pb-4">
        <h3 className="text-lg font-medium">Cliente: {cliente.nombre}</h3>
        <p className="text-sm text-gray-500">{cliente.direccion}</p>
        <p className="text-sm text-gray-500">{cliente.poblacion}, {cliente.provincia}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium">Líneas de Factura</h4>
          <button
            type="button"
            onClick={addLinea}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir Línea
          </button>
        </div>

        {lineas.map((linea, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5">
              <input
                type="text"
                value={linea.descripcion}
                onChange={(e) => updateLinea(index, 'descripcion', e.target.value)}
                placeholder="Descripción"
                className="w-full rounded-md border-gray-300"
                required
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                value={linea.cantidad}
                onChange={(e) => updateLinea(index, 'cantidad', e.target.value)}
                placeholder="Cantidad"
                min="1"
                className="w-full rounded-md border-gray-300"
                required
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                value={linea.precioUnitario}
                onChange={(e) => updateLinea(index, 'precioUnitario', e.target.value)}
                placeholder="Precio"
                min="0"
                step="0.01"
                className="w-full rounded-md border-gray-300"
                required
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                value={linea.iva}
                onChange={(e) => updateLinea(index, 'iva', e.target.value)}
                placeholder="IVA %"
                min="0"
                max="100"
                className="w-full rounded-md border-gray-300"
                required
              />
            </div>
            <div className="col-span-1">
              {lineas.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLinea(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="text-right text-lg font-medium">
          Total: {formatCurrency(calcularTotal())}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Generar Factura
        </button>
      </div>
    </form>
  );
}

function getLineaVacia(): LineaFactura {
  return {
    descripcion: '',
    cantidad: 1,
    precioUnitario: 0,
    iva: 21
  };
}
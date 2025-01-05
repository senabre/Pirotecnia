import React from 'react';
import { Download, Eye } from 'lucide-react';
import type { Factura } from '../../types/types';
import { formatCurrency, formatDate } from '../../utils/format';

interface FacturaListProps {
  facturas: Factura[];
  onVerDetalles: (factura: Factura) => void;
  onDescargar: (factura: Factura) => void;
}

export default function FacturaList({ facturas, onVerDetalles, onDescargar }: FacturaListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Número
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {facturas.map((factura) => (
            <tr key={factura.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {factura.numero}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(factura.fecha)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {factura.clienteId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatCurrency(calcularTotalFactura(factura))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onVerDetalles(factura)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Ver detalles"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDescargar(factura)}
                    className="text-green-600 hover:text-green-800"
                    title="Descargar factura"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function calcularTotalFactura(factura: Factura): number {
  return factura.lineas.reduce((total, linea) => {
    const subtotal = linea.cantidad * linea.precioUnitario;
    const iva = subtotal * (linea.iva / 100);
    return total + subtotal + iva;
  }, 0);
}
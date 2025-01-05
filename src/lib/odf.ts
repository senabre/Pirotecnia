import { ODFDocument } from 'odf-generator';
import type { Factura } from '../types/types';
import { formatCurrency, formatDate } from '../utils/format';

export async function generateODF(factura: Factura): Promise<Uint8Array> {
  const doc = new ODFDocument();

  // Añadir estilos y contenido
  doc.addParagraph(`Factura Nº: ${factura.numero}`);
  doc.addParagraph(`Fecha: ${formatDate(factura.fecha)}`);
  
  // Tabla de líneas
  const table = doc.addTable(factura.lineas.length + 1, 5);
  
  // Cabecera
  table.setCell(0, 0, 'Descripción');
  table.setCell(0, 1, 'Cantidad');
  table.setCell(0, 2, 'Precio Unit.');
  table.setCell(0, 3, 'IVA');
  table.setCell(0, 4, 'Total');

  // Líneas
  factura.lineas.forEach((linea, index) => {
    const subtotal = linea.cantidad * linea.precioUnitario;
    const iva = subtotal * (linea.iva / 100);
    const total = subtotal + iva;

    table.setCell(index + 1, 0, linea.descripcion);
    table.setCell(index + 1, 1, linea.cantidad.toString());
    table.setCell(index + 1, 2, formatCurrency(linea.precioUnitario));
    table.setCell(index + 1, 3, `${linea.iva}%`);
    table.setCell(index + 1, 4, formatCurrency(total));
  });

  if (factura.observaciones) {
    doc.addParagraph('Observaciones:');
    doc.addParagraph(factura.observaciones);
  }

  return doc.generate();
}
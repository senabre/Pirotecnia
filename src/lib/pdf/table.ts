import type { PDFGenerationContext, PDFTableOptions } from './types';
import { formatCurrency } from '../../utils/format';

export function drawTable(context: PDFGenerationContext, options: PDFTableOptions) {
  const { doc, factura } = context;
  const { columns, startY, padding = 20 } = options;

  // Dibujar cabecera
  let xPosition = doc.page.margins.left;
  doc.font('Helvetica-Bold');
  
  columns.forEach((column) => {
    doc.text(column.header, xPosition, startY, {
      width: column.width,
      align: column.align || 'left'
    });
    xPosition += column.width;
  });

  // Dibujar líneas
  let yPosition = startY + padding;
  doc.font('Helvetica');

  factura.lineas.forEach((linea) => {
    const subtotal = linea.cantidad * linea.precioUnitario;
    const iva = subtotal * (linea.iva / 100);
    const total = subtotal + iva;

    xPosition = doc.page.margins.left;

    const values = [
      linea.descripcion,
      linea.cantidad.toString(),
      formatCurrency(linea.precioUnitario),
      `${linea.iva}%`,
      formatCurrency(total)
    ];

    columns.forEach((column, index) => {
      doc.text(values[index], xPosition, yPosition, {
        width: column.width,
        align: column.align || 'left'
      });
      xPosition += column.width;
    });

    yPosition += padding;
  });

  return yPosition;
}
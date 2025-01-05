import type { PDFGenerationContext } from './types';
import { formatCurrency } from '../../utils/format';

export function drawFooter(context: PDFGenerationContext, startY: number) {
  const { doc, factura } = context;

  doc.y = startY + 20;

  // Calcular total
  const totalFactura = factura.lineas.reduce((acc, linea) => {
    const subtotal = linea.cantidad * linea.precioUnitario;
    return acc + subtotal + (subtotal * linea.iva / 100);
  }, 0);

  // Total
  doc.font('Helvetica-Bold')
     .text(`Total Factura: ${formatCurrency(totalFactura)}`, {
       align: 'right'
     });

  // Observaciones
  if (factura.observaciones) {
    doc.moveDown()
       .font('Helvetica')
       .text('Observaciones:', { underline: true })
       .text(factura.observaciones);
  }
}
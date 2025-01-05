import type { PDFGenerationContext } from './types';
import { formatDate } from '../../utils/format';

export function drawHeader(context: PDFGenerationContext) {
  const { doc, factura } = context;

  // Título
  doc.fontSize(20)
     .text('FACTURA', { align: 'center' })
     .moveDown();

  // Información de la factura
  doc.fontSize(12)
     .text(`Factura Nº: ${factura.numero}`)
     .text(`Fecha: ${formatDate(factura.fecha)}`)
     .moveDown();

  return doc.y;
}
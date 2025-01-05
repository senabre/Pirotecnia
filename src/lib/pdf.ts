import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import type { Factura } from '../types/types';
import { formatCurrency, formatDate } from '../utils/format';

export async function generatePDF(factura: Factura): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    // Pipe el PDF a un blob stream
    const stream = doc.pipe(blobStream());

    try {
      // Configurar fuente y tamaño por defecto
      doc.font('Helvetica');

      // Cabecera
      doc.fontSize(20)
         .text('FACTURA', { align: 'center' })
         .moveDown();

      // Información de la factura
      doc.fontSize(12)
         .text(`Factura Nº: ${factura.numero}`)
         .text(`Fecha: ${formatDate(factura.fecha)}`)
         .moveDown();

      // Tabla de líneas
      const tableTop = doc.y;
      const tableHeaders = ['Descripción', 'Cantidad', 'Precio Unit.', 'IVA', 'Total'];
      const columnWidths = [240, 60, 80, 60, 80];
      
      // Dibujar cabecera de la tabla
      let xPosition = 50;
      doc.font('Helvetica-Bold');
      tableHeaders.forEach((header, i) => {
        doc.text(header, xPosition, tableTop, {
          width: columnWidths[i],
          align: i > 0 ? 'right' : 'left'
        });
        xPosition += columnWidths[i];
      });

      // Dibujar líneas
      doc.font('Helvetica');
      let yPosition = tableTop + 20;

      factura.lineas.forEach((linea) => {
        const subtotal = linea.cantidad * linea.precioUnitario;
        const iva = subtotal * (linea.iva / 100);
        const total = subtotal + iva;

        xPosition = 50;
        doc.text(linea.descripcion, xPosition, yPosition, {
          width: columnWidths[0]
        });
        xPosition += columnWidths[0];

        doc.text(linea.cantidad.toString(), xPosition, yPosition, {
          width: columnWidths[1],
          align: 'right'
        });
        xPosition += columnWidths[1];

        doc.text(formatCurrency(linea.precioUnitario), xPosition, yPosition, {
          width: columnWidths[2],
          align: 'right'
        });
        xPosition += columnWidths[2];

        doc.text(`${linea.iva}%`, xPosition, yPosition, {
          width: columnWidths[3],
          align: 'right'
        });
        xPosition += columnWidths[3];

        doc.text(formatCurrency(total), xPosition, yPosition, {
          width: columnWidths[4],
          align: 'right'
        });

        yPosition += 20;
      });

      // Total
      const totalFactura = factura.lineas.reduce((acc, linea) => {
        const subtotal = linea.cantidad * linea.precioUnitario;
        return acc + subtotal + (subtotal * linea.iva / 100);
      }, 0);

      doc.moveDown()
         .font('Helvetica-Bold')
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

      // Finalizar el documento
      doc.end();

      // Cuando el stream termine, resolver la promesa con el blob
      stream.on('finish', () => {
        resolve(stream.toBlob('application/pdf'));
      });
    } catch (error) {
      reject(error);
    }
  });
}
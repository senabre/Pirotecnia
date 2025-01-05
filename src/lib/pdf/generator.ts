import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import type { Factura } from '../../types/types';
import { drawHeader } from './header';
import { drawTable } from './table';
import { drawFooter } from './footer';
import type { TableColumn } from './types';

const TABLE_COLUMNS: TableColumn[] = [
  { header: 'Descripción', width: 240, align: 'left' },
  { header: 'Cantidad', width: 60, align: 'right' },
  { header: 'Precio Unit.', width: 80, align: 'right' },
  { header: 'IVA', width: 60, align: 'right' },
  { header: 'Total', width: 80, align: 'right' }
];

export async function generatePDF(factura: Factura): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    const stream = doc.pipe(blobStream());
    const context = { doc, factura };

    try {
      doc.font('Helvetica');

      // Dibujar las diferentes secciones
      const headerBottom = drawHeader(context);
      const tableBottom = drawTable(context, {
        columns: TABLE_COLUMNS,
        startY: headerBottom
      });
      drawFooter(context, tableBottom);

      doc.end();

      stream.on('finish', () => {
        resolve(stream.toBlob('application/pdf'));
      });
    } catch (error) {
      reject(error);
    }
  });
}
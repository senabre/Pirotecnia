import type { Factura } from '../../types/types';

export interface TableColumn {
  header: string;
  width: number;
  align?: 'left' | 'right' | 'center';
}

export interface PDFTableOptions {
  columns: TableColumn[];
  startY: number;
  padding?: number;
}

export interface PDFGenerationContext {
  factura: Factura;
  doc: PDFKit.PDFDocument;
}
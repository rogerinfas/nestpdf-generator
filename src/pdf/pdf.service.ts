import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';

// Importar las fuentes
const pdfFonts = require('pdfmake/build/vfs_fonts');

// Inicializar las fuentes de pdfmake
(pdfMake as any).vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

@Injectable()
export class PdfService {
  constructor() {}

  async generarPdfHorizontal(contenido: any[] = [], nombreArchivo: string = 'documento') {
    // Definir el documento con orientación horizontal
    const docDefinition = {
      pageOrientation: 'landscape' as const,
      pageSize: 'A4' as const, // Asegurar que sea un valor literal
      content: [
        { text: 'Documento en Horizontal', style: 'header' },
        { text: '\n\n' }, // Espacio en blanco
        {
          // Tabla de ejemplo para mostrar el formato horizontal
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4'],
              ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4'],
              ['Dato 5', 'Dato 6', 'Dato 7', 'Dato 8']
            ]
          }
        },
        { text: '\n\n' }, // Espacio en blanco
        ...contenido // Contenido personalizado que se pase como parámetro
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center' as const,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        }
      },
      defaultStyle: {
        fontSize: 12,
        margin: [20, 20, 20, 20] as [number, number, number, number]
      }
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    
    // Retornar el PDF como buffer
    return new Promise((resolve) => {
      pdfDoc.getBuffer((buffer) => {
        resolve({
          buffer,
          nombre: `${nombreArchivo}.pdf`,
          tipo: 'application/pdf'
        });
      });
    });
  }
}

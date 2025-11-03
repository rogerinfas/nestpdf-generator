import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('generar')
  async generarPdf(@Res() res: Response) {
    try {
      // Contenido personalizado para el PDF
      const contenidoPersonalizado = [
        { text: 'Información Personal', style: 'subheader' },
        { text: 'Nombre: Ejemplo Usuario' },
        { text: 'Email: ejemplo@correo.com' },
        { text: '\n\n' }, // Espacio en blanco
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              ['Campo', 'Valor'],
              ['Fecha', new Date().toLocaleDateString()],
              ['Hora', new Date().toLocaleTimeString()]
            ]
          }
        }
      ];

      const pdf = await this.pdfService.generarPdfHorizontal(contenidoPersonalizado, 'documento_horizontal') as { buffer: Buffer; nombre: string };
      
      // Configurar la respuesta HTTP
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${pdf.nombre}`,
        'Content-Length': pdf.buffer.length.toString(),
      });
      
      res.send(pdf.buffer);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      res.status(500).send('Error al generar el PDF');
    }
  }
}

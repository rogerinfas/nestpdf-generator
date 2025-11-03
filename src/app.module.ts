import { Module } from '@nestjs/common';
import { PdfModule } from './pdf/pdf.module';
import { PdfController } from './pdf/pdf.controller';

@Module({
  imports: [PdfModule],
  controllers: [PdfController],
  providers: [],
})
export class AppModule {}

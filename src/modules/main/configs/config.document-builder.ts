import { DocumentBuilder } from '@nestjs/swagger';

export const configDocumentBuilder = new DocumentBuilder()
  .setTitle('Facturación')
  .setDescription('Pequeño sistema de facturación')
  .setVersion('1.0')
  .addTag('Bodega', 'Módulo de bodega')
  .addTag('Cliente', 'Modulo de cliente')
  .addTag('Ventas', 'Modulo de ventas')
  .addBearerAuth(
    { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();

// Libraries
import { SwaggerDocumentOptions } from '@nestjs/swagger';

// Modules
import { ClienteModule } from '../../cliente/cliente.module';
import { BodegaModule } from '../../bodega/bodega.module';
import { VentasModule } from '../../ventas/ventas.module';

// Entities
import {
  ClienteEntity,
  DescuentoEntity,
  DetalleFacturaEntity,
  FacturaEntity,
  ProductoEntity,
} from '../../../common/database/postgresql/entities';

export const optionsCreateDocument: SwaggerDocumentOptions = {
  include: [ClienteModule, BodegaModule, VentasModule],
  extraModels: [
    ClienteEntity,
    DescuentoEntity,
    DetalleFacturaEntity,
    FacturaEntity,
    ProductoEntity,
  ],
};

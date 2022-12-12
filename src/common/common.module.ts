// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configs
import { PostgreSQLConfig } from './database/postgresql/postgresql.config';

// Services
import { ClienteService } from './database/postgresql/repositories/cliente.service';
import { FacturaService } from './database/postgresql/repositories/factura.service';
import { ProductoService } from './database/postgresql/repositories/producto.service';
import { DescuentoService } from './database/postgresql/repositories/descuento.service';
import { DetalleFacturaService } from './database/postgresql/repositories/detalle-factura.service';

// Entities
import {
  ClienteEntity,
  DescuentoEntity,
  DetalleFacturaEntity,
  FacturaEntity,
  ProductoEntity,
} from './database/postgresql/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: PostgreSQLConfig }),
    TypeOrmModule.forFeature([
      ClienteEntity,
      DescuentoEntity,
      DetalleFacturaEntity,
      FacturaEntity,
      ProductoEntity,
    ]),
  ],
  providers: [
    ClienteService,
    DescuentoService,
    DetalleFacturaService,
    FacturaService,
    ProductoService,
  ],
  exports: [
    TypeOrmModule,
    ClienteService,
    DescuentoService,
    DetalleFacturaService,
    FacturaService,
    ProductoService,
  ],
})
export class CommonModule {}

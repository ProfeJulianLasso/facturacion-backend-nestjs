// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configs
import { ConfigDataBase } from './database';

// Services
import {
  ClienteService,
  FacturaService,
  ProductoService,
  DescuentoService,
  DetalleFacturaService,
} from './database';

// Entities
import {
  ClienteEntity,
  DescuentoEntity,
  DetalleFacturaEntity,
  FacturaEntity,
  ProductoEntity,
} from './database';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: ConfigDataBase }),
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

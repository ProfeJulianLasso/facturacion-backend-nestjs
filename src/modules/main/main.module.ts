// Libraries
import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

// Exception Filters
import { QueryFailedErrorExceptionFilter } from '../../common/exception-filters';

// Modules
import { ClienteModule } from '../cliente/cliente.module';
import { BodegaModule } from '../bodega/bodega.module';
import { VentasModule } from '../ventas/ventas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
      isGlobal: true,
    }),
    BodegaModule,
    ClienteModule,
    VentasModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryFailedErrorExceptionFilter,
    },
  ],
})
export class MainModule {}

// Libraries
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  providers: [],
})
export class MainModule {}

// Libraries
import { Module } from '@nestjs/common';

// Controllers
import { BodegaController } from './controllers/bodega.controller';

// Services
import { BodegaService } from './services/bodega.service';

// Modules
import { CommonModule } from '../../common/common.module';

// Use cases
import {
  CrearProductoUseCase,
  ObtenerProductoUseCase,
  ObtenerProductosUseCase,
} from './use-cases';

@Module({
  controllers: [BodegaController],
  imports: [CommonModule],
  providers: [
    BodegaService,
    CrearProductoUseCase,
    ObtenerProductoUseCase,
    ObtenerProductosUseCase,
  ],
})
export class BodegaModule {}

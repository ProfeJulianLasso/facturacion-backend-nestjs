// Libraries
import { Injectable } from '@nestjs/common';

// Entities
import { ProductoEntity } from '../../../common/database';

// Services
import { BodegaService } from '../services/bodega.service';

@Injectable()
export class ObtenerProductosUseCase {
  constructor(private readonly bodegaService: BodegaService) {}

  async execute(): Promise<ProductoEntity[]> {
    return await this.bodegaService.obtenerTodosLosProductos();
  }
}

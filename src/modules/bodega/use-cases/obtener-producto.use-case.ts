// Libraries
import { Injectable } from '@nestjs/common';

// Entities
import { ProductoEntity } from '../../../common/database';

// Services
import { BodegaService } from '../services/bodega.service';

@Injectable()
export class ObtenerProductoUseCase {
  constructor(private readonly bodegaService: BodegaService) {}

  async execute(id: string): Promise<ProductoEntity> {
    return await this.bodegaService.obtenerProducto(id);
  }
}

// Libraries
import { Injectable } from '@nestjs/common';

// Data transfer objects
import { NuevoProductoDTO } from '../data-transfer-objects/nuevo-producto.dto';

// Entities
import { ProductoEntity } from '../../../common/database/postgresql/entities';

// Services
import { BodegaService } from '../services/bodega.service';

@Injectable()
export class CrearProductoUseCase {
  constructor(private readonly bodegaService: BodegaService) {}

  async execute(producto: NuevoProductoDTO): Promise<ProductoEntity> {
    return await this.bodegaService.crearProducto(producto);
  }
}

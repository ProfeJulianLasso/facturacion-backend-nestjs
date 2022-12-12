// Libraries
import { Body, Controller, Post } from '@nestjs/common';

// Data transfer objects
import { NuevoProductoDTO } from '../data-transfer-objects';

// Entities
import { ProductoEntity } from '../../../common/database';

// Use cases
import { CrearProductoUseCase } from '../use-cases';

@Controller('v1/bodega')
export class BodegaController {
  constructor(private readonly crearProductoUseCase: CrearProductoUseCase) {}

  @Post()
  async nuevoProducto(
    @Body() producto: NuevoProductoDTO,
  ): Promise<ProductoEntity> {
    return await this.crearProductoUseCase.execute(producto);
  }
}

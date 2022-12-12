// Libraries
import { Body, Controller, Post } from '@nestjs/common';

// Data transfer objects
import { NuevoProductoDTO } from '../data-transfer-objects/nuevo-producto.dto';

// Entities
import { ProductoEntity } from '../../../common/database/postgresql/entities/producto.entity';

// Use cases
import { CrearProductoUseCase } from '../use-cases/crear-producto.use-case';

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

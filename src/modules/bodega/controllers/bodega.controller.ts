// Libraries
import { Body, Controller, Get, Post } from '@nestjs/common';

// Data transfer objects
import { NuevoProductoDTO } from '../data-transfer-objects';

// Entities
import { ProductoEntity } from '../../../common/database';

// Use cases
import { CrearProductoUseCase, ObtenerProductosUseCase } from '../use-cases';

@Controller('v1/bodega')
export class BodegaController {
  constructor(
    private readonly crearProductoUseCase: CrearProductoUseCase,
    private readonly obtenerProductosUseCase: ObtenerProductosUseCase,
  ) {}

  @Get('productos')
  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    return await this.obtenerProductosUseCase.execute();
  }

  @Post('producto')
  async nuevoProducto(
    @Body() producto: NuevoProductoDTO,
  ): Promise<ProductoEntity> {
    return await this.crearProductoUseCase.execute(producto);
  }
}

// Libraries
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

// Data transfer objects
import { NuevoProductoDTO } from '../data-transfer-objects';

// Entities
import { ProductoEntity } from '../../../common/database';

// Use cases
import {
  CrearProductoUseCase,
  ObtenerProductosUseCase,
  ObtenerProductoUseCase,
} from '../use-cases';

@Controller('v1/bodega')
export class BodegaController {
  constructor(
    private readonly crearProductoUseCase: CrearProductoUseCase,
    private readonly obtenerProductosUseCase: ObtenerProductosUseCase,
    private readonly obtenerProductoUseCase: ObtenerProductoUseCase,
  ) {}

  @Get('productos')
  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    return await this.obtenerProductosUseCase.execute();
  }

  @Get('producto')
  async obtenerProductos(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ProductoEntity> {
    return await this.obtenerProductoUseCase.execute(id);
  }

  @Post('producto')
  async nuevoProducto(
    @Body() producto: NuevoProductoDTO,
  ): Promise<ProductoEntity> {
    return await this.crearProductoUseCase.execute(producto);
  }
}

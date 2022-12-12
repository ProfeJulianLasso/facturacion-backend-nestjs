// Libraries
import { Injectable } from '@nestjs/common';

// Data transfer objects
import { NuevoProducto } from '../data-transfer-objects/nuevo-producto.dto';

// Entities
import { ProductoEntity } from '../../../common/database/postgresql/entities';

// Services
import { ProductoService } from '../../../common/database/postgresql/repositories/producto.service';

@Injectable()
export class CrearProductoUseCase {
  constructor(private readonly productoService: ProductoService) {}

  async execute(producto: NuevoProducto): Promise<ProductoEntity> {
    const newProducto = new ProductoEntity();
    newProducto.nombre = producto.nombre;
    newProducto.valor = producto.valor;
    return await this.productoService.create(newProducto);
  }
}

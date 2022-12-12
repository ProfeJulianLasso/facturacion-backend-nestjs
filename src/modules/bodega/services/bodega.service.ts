// Libraries
import { Injectable } from '@nestjs/common';

// Data transfer objects
import { NuevoProductoDTO } from '../data-transfer-objects';

// Entities
import { ProductoEntity } from '../../../common/database';

// Services
import { ProductoService } from '../../../common/database';

@Injectable()
export class BodegaService {
  constructor(private readonly productoService: ProductoService) {}

  async crearProducto(producto: NuevoProductoDTO): Promise<ProductoEntity> {
    const newProducto = new ProductoEntity();
    newProducto.nombre = producto.nombre;
    newProducto.valor = producto.valor;
    return await this.productoService.create(newProducto);
  }
}

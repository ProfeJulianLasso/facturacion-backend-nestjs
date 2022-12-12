import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductoEntity } from '../../../../common/database';
import { DetalleFacturaEntity } from '../../../../common/database/postgresql/entities/detalle-factura.entity';
import { NuevoProductoDTO } from '../../../bodega/data-transfer-objects/nuevo-producto.dto';

@Resolver()
export class HolaMundoResolver {
  @Query(() => String, { name: 'ElQueYoQuiero' })
  holaMundo1(): string {
    return 'Hola Mundo desde GraphQL - 1';
  }

  @Query(() => [String])
  holaMundo2(): string[] {
    return ['A', 'B', 'C', 'D'];
  }

  @Query(() => [ProductoEntity])
  holaMundo3(
    @Args('data', { type: () => Int }) data: number,
  ): ProductoEntity[] {
    const producto = new ProductoEntity();
    producto.id = '8aea253a-76ec-43c7-866a-302f71c38231';
    producto.nombre = 'Jabón';
    producto.valor = 3000;
    producto.estado = true;
    producto.createdAt = new Date();
    producto.detalleFacturas = new Array<DetalleFacturaEntity>();

    const detalleFactura = new DetalleFacturaEntity();
    detalleFactura.id = '521b706c-30d7-4c39-9e44-7ff4dbf2ee9e';
    detalleFactura.facturaId = '8aea253a-76ec-43c7-866a-302f71c38231';
    detalleFactura.cantidad = 30;
    detalleFactura.valorBruto = 300000;
    detalleFactura.valorUnitario = 3000;

    producto.detalleFacturas.push(detalleFactura);

    return new Array(producto);
  }

  @Mutation(() => String, { name: 'CrearProducto' })
  nuevoProducto(
    @Args('producto', { type: () => NuevoProductoDTO })
    producto: NuevoProductoDTO,
  ): string {
    console.log(producto);
    return 'El producto fue creado';
  }
}

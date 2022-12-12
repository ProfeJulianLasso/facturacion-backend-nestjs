import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { FacturaEntity } from './factura.entity';
import { ProductoEntity } from './producto.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index(
  'detalle_factura_factura_id_producto_id_deleted_at_Idx',
  ['deletedAt', 'facturaId', 'productoId'],
  { unique: true },
)
@Index('pkdetalle_factura', ['id'], { unique: true })
@Entity('detalle_factura', { schema: 'public' })
export class DetalleFacturaEntity {
  @Field(() => String)
  @Column('uuid', {
    primary: true,
    name: 'detalle_factura_id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Field(() => String)
  @Column('uuid', { name: 'factura_id' })
  facturaId: string;

  @Field(() => String)
  @Column('uuid', { name: 'producto_id' })
  productoId: string;

  @Field(() => Int)
  @Column('integer', { name: 'detalle_factura_cantidad' })
  cantidad: number;

  @Field(() => Int)
  @Column('bigint', { name: 'detalle_factura_valor_unitario' })
  valorUnitario: number;

  @Field(() => Int)
  @Column('bigint', { name: 'detalle_factura_valor_bruto' })
  valorBruto: number;

  @Field(() => String)
  @Column('timestamp without time zone', {
    name: 'detalle_factura_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @Column('timestamp without time zone', {
    name: 'detalle_factura_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Field(() => String, { nullable: true })
  @Column('timestamp without time zone', {
    name: 'detalle_factura_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(() => FacturaEntity, (factura) => factura.detalleFacturas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'factura_id', referencedColumnName: 'id' }])
  factura: FacturaEntity;

  @Field(() => ProductoEntity, { description: 'Producto' })
  @ManyToOne(() => ProductoEntity, (producto) => producto.detalleFacturas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'producto_id', referencedColumnName: 'id' }])
  producto: ProductoEntity;
}

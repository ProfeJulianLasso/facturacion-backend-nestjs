import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { FacturaEntity } from './factura.entity';
import { ProductoEntity } from './producto.entity';

@Index(
  'detalle_factura_factura_id_producto_id_deleted_at_Idx',
  ['deletedAt', 'facturaId', 'productoId'],
  { unique: true },
)
@Index('pkdetalle_factura', ['id'], { unique: true })
@Entity('detalle_factura', { schema: 'public' })
export class DetalleFacturaEntity {
  @Column('uuid', {
    primary: true,
    name: 'detalle_factura_id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('uuid', { name: 'factura_id' })
  facturaId: string;

  @Column('uuid', { name: 'producto_id' })
  productoId: string;

  @Column('integer', { name: 'detalle_factura_cantidad' })
  cantidad: number;

  @Column('bigint', { name: 'detalle_factura_valor_unitario' })
  valorUnitario: number;

  @Column('bigint', { name: 'detalle_factura_valor_bruto' })
  valorBruto: number;

  @Column('timestamp without time zone', {
    name: 'detalle_factura_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'detalle_factura_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

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

  @ManyToOne(() => ProductoEntity, (producto) => producto.detalleFacturas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'producto_id', referencedColumnName: 'id' }])
  producto: ProductoEntity;
}

import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { FacturaEntity } from './factura.entity';
import { ProductoEntity } from './producto.entity';

@Index(
  'detalle_factura_factura_id_producto_id_deleted_at_Idx',
  ['detalleFacturaDeletedAt', 'facturaId', 'productoId'],
  { unique: true },
)
@Index('pkdetalle_factura', ['detalleFacturaId'], { unique: true })
@Entity('detalle_factura', { schema: 'public' })
export class DetalleFacturaEntity {
  @Column('uuid', {
    primary: true,
    name: 'detalle_factura_id',
    default: () => 'gen_random_uuid()',
  })
  detalleFacturaId: string;

  @Column('uuid', { name: 'factura_id' })
  facturaId: string;

  @Column('uuid', { name: 'producto_id' })
  productoId: string;

  @Column('integer', { name: 'detalle_factura_cantidad' })
  detalleFacturaCantidad: number;

  @Column('bigint', { name: 'detalle_factura_valor_unitario' })
  detalleFacturaValorUnitario: string;

  @Column('bigint', { name: 'detalle_factura_valor_bruto' })
  detalleFacturaValorBruto: string;

  @Column('timestamp without time zone', {
    name: 'detalle_factura_created_at',
    default: () => 'now()',
  })
  detalleFacturaCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'detalle_factura_updated_at',
    nullable: true,
  })
  detalleFacturaUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'detalle_factura_deleted_at',
    nullable: true,
  })
  detalleFacturaDeletedAt: Date | null;

  @ManyToOne(() => FacturaEntity, (factura) => factura.detalleFacturas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'factura_id', referencedColumnName: 'facturaId' }])
  factura: FacturaEntity;

  @ManyToOne(() => ProductoEntity, (producto) => producto.detalleFacturas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'producto_id', referencedColumnName: 'productoId' }])
  producto: ProductoEntity;
}

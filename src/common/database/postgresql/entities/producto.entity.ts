import { Column, Entity, Index, OneToMany } from 'typeorm';
import { DetalleFacturaEntity } from './detalle-factura.entity';

@Index(
  'producto_nombre_deletedAt_Idx',
  ['productoDeletedAt', 'productoNombre'],
  { unique: true },
)
@Index('producto_producto_estado_Idx', ['productoEstado'], {})
@Index('pkproducto', ['productoId'], { unique: true })
@Entity('producto', { schema: 'public' })
export class ProductoEntity {
  @Column('uuid', {
    primary: true,
    name: 'producto_id',
    default: () => 'gen_random_uuid()',
  })
  productoId: string;

  @Column('character varying', { name: 'producto_nombre', length: 500 })
  productoNombre: string;

  @Column('bigint', { name: 'producto_valor' })
  productoValor: string;

  @Column('boolean', { name: 'producto_estado', default: () => 'true' })
  productoEstado: boolean;

  @Column('timestamp without time zone', {
    name: 'producto_created_at',
    default: () => 'now()',
  })
  productoCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'producto_updated_at',
    nullable: true,
  })
  productoUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'producto_deleted_at',
    nullable: true,
  })
  productoDeletedAt: Date | null;

  @OneToMany(
    () => DetalleFacturaEntity,
    (detalleFactura) => detalleFactura.producto,
  )
  detalleFacturas: DetalleFacturaEntity[];
}

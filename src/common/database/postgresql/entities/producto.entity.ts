import { Column, Entity, Index, OneToMany } from 'typeorm';
import { DetalleFacturaEntity } from './detalle-factura.entity';

@Index('producto_nombre_deletedAt_Idx', ['deletedAt', 'nombre'], {
  unique: true,
})
@Index('producto_producto_estado_Idx', ['estado'], {})
@Index('pkproducto', ['id'], { unique: true })
@Entity('producto', { schema: 'public' })
export class ProductoEntity {
  @Column('uuid', {
    primary: true,
    name: 'producto_id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('character varying', { name: 'producto_nombre', length: 500 })
  nombre: string;

  @Column('bigint', { name: 'producto_valor' })
  valor: number;

  @Column('boolean', { name: 'producto_estado', default: () => 'true' })
  estado: boolean;

  @Column('timestamp without time zone', {
    name: 'producto_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'producto_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'producto_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => DetalleFacturaEntity,
    (detalleFactura) => detalleFactura.producto,
  )
  detalleFacturas: DetalleFacturaEntity[];
}

import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { FacturaEntity } from './factura.entity';

@Index('descuento_descuento_deletedAt_Idx', ['deletedAt'], {})
@Index('pkdescuento', ['id'], { unique: true })
@Index('descuento_factura_id_Idx', ['facturaId'], {})
@Entity('descuento', { schema: 'public' })
export class DescuentoEntity {
  @Column('uuid', {
    primary: true,
    name: 'descuento_id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('uuid', { name: 'factura_id' })
  facturaId: string;

  @Column('character varying', { name: 'descuento_concepto', length: 1024 })
  concepto: string;

  @Column('bigint', { name: 'descuento_valor' })
  valor: number;

  @Column('timestamp without time zone', {
    name: 'descuento_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'descuento_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'descuento_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(() => FacturaEntity, (factura) => factura.descuentos, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'factura_id', referencedColumnName: 'id' }])
  factura: FacturaEntity;
}

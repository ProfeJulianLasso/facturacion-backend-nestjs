import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { FacturaEntity } from './factura.entity';

@Index('descuento_descuento_deletedAt_Idx', ['descuentoDeletedAt'], {})
@Index('pkdescuento', ['descuentoId'], { unique: true })
@Index('descuento_factura_id_Idx', ['facturaId'], {})
@Entity('descuento', { schema: 'public' })
export class DescuentoEntity {
  @Column('uuid', {
    primary: true,
    name: 'descuento_id',
    default: () => 'gen_random_uuid()',
  })
  descuentoId: string;

  @Column('uuid', { name: 'factura_id' })
  facturaId: string;

  @Column('character varying', { name: 'descuento_concepto', length: 1024 })
  descuentoConcepto: string;

  @Column('bigint', { name: 'descuento_valor' })
  descuentoValor: string;

  @Column('timestamp without time zone', {
    name: 'descuento_created_at',
    default: () => 'now()',
  })
  descuentoCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'descuento_updated_at',
    nullable: true,
  })
  descuentoUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'descuento_deleted_at',
    nullable: true,
  })
  descuentoDeletedAt: Date | null;

  @ManyToOne(() => FacturaEntity, (factura) => factura.descuentos, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'factura_id', referencedColumnName: 'facturaId' }])
  factura: FacturaEntity;
}

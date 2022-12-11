import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DescuentoEntity } from './descuento.entity';
import { DetalleFacturaEntity } from './detalle-factura.entity';
import { ClienteEntity } from './cliente.entity';

@Index('factura_cliente_id_Idx', ['clienteId'], {})
@Index('factura_factura_deleted_at_Idx', ['facturaDeletedAt'], {})
@Index('pkfactura', ['facturaId'], { unique: true })
@Entity('factura', { schema: 'public' })
export class FacturaEntity {
  @Column('uuid', {
    primary: true,
    name: 'factura_id',
    default: () => 'gen_random_uuid()',
  })
  facturaId: string;

  @Column('uuid', { name: 'cliente_id' })
  clienteId: string;

  @Column('bigint', { name: 'factura_precio_bruto' })
  facturaPrecioBruto: string;

  @Column('bigint', { name: 'factura_precio_neto' })
  facturaPrecioNeto: string;

  @Column('timestamp without time zone', {
    name: 'factura_created_at',
    default: () => 'now()',
  })
  facturaCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'factura_updated_at',
    nullable: true,
  })
  facturaUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'factura_deleted_at',
    nullable: true,
  })
  facturaDeletedAt: Date | null;

  @OneToMany(() => DescuentoEntity, (descuento) => descuento.factura)
  descuentos: DescuentoEntity[];

  @OneToMany(
    () => DetalleFacturaEntity,
    (detalleFactura) => detalleFactura.factura,
  )
  detalleFacturas: DetalleFacturaEntity[];

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.facturas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cliente_id', referencedColumnName: 'clienteId' }])
  cliente: ClienteEntity;
}

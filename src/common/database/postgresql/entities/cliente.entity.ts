import { Column, Entity, Index, OneToMany } from 'typeorm';
import { FacturaEntity } from './factura.entity';

@Index('cliente_cliente_correo_Idx', ['clienteCorreo'], {})
@Index(
  'tipo_documento_numero_documento_deletedAt_Idx',
  ['deletedAt', 'numeroDocumento', 'tipoDocumento'],
  { unique: true },
)
@Index('cliente_cliente_deletedAt_Idx', ['deletedAt'], {})
@Index('cliente_cliente_estado_Idx', ['estado'], {})
@Index('pkcliente', ['id'], { unique: true })
@Index('cliente_cliente_telefono_Idx', ['telefono'], {})
@Entity('cliente', { schema: 'public' })
export class ClienteEntity {
  @Column('uuid', {
    primary: true,
    name: 'cliente_id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('character varying', { name: 'cliente_tipo_documento', length: 2 })
  tipoDocumento: string;

  @Column('character varying', { name: 'cliente_numero_documento', length: 15 })
  numeroDocumento: string;

  @Column('character varying', { name: 'cliente_nombre', length: 500 })
  nombre: string;

  @Column('character varying', { name: 'cliente_telefono', length: 15 })
  telefono: string;

  @Column('character varying', {
    name: 'cliente_correo',
    nullable: true,
    length: 500,
  })
  clienteCorreo: string | null;

  @Column('boolean', { name: 'cliente_estado', default: () => 'true' })
  estado: boolean;

  @Column('timestamp without time zone', {
    name: 'cliente_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cliente_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cliente_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => FacturaEntity, (factura) => factura.cliente, {
    cascade: ['insert', 'update'],
  })
  facturas: FacturaEntity[];
}

import { Column, Entity, Index, OneToMany } from 'typeorm';
import { FacturaEntity } from './factura.entity';

@Index('cliente_cliente_correo_Idx', ['clienteCorreo'], {})
@Index(
  'tipo_documento_numero_documento_deletedAt_Idx',
  ['clienteDeletedAt', 'clienteNumeroDocumento', 'clienteTipoDocumento'],
  { unique: true },
)
@Index('cliente_cliente_deletedAt_Idx', ['clienteDeletedAt'], {})
@Index('cliente_cliente_estado_Idx', ['clienteEstado'], {})
@Index('pkcliente', ['clienteId'], { unique: true })
@Index('cliente_cliente_telefono_Idx', ['clienteTelefono'], {})
@Entity('cliente', { schema: 'public' })
export class ClienteEntity {
  @Column('uuid', {
    primary: true,
    name: 'cliente_id',
    default: () => 'gen_random_uuid()',
  })
  clienteId: string;

  @Column('character varying', { name: 'cliente_tipo_documento', length: 2 })
  clienteTipoDocumento: string;

  @Column('character varying', { name: 'cliente_numero_documento', length: 15 })
  clienteNumeroDocumento: string;

  @Column('character varying', { name: 'cliente_nombre', length: 500 })
  clienteNombre: string;

  @Column('character varying', { name: 'cliente_telefono', length: 15 })
  clienteTelefono: string;

  @Column('character varying', {
    name: 'cliente_correo',
    nullable: true,
    length: 500,
  })
  clienteCorreo: string | null;

  @Column('boolean', { name: 'cliente_estado', default: () => 'true' })
  clienteEstado: boolean;

  @Column('timestamp without time zone', {
    name: 'cliente_created_at',
    default: () => 'now()',
  })
  clienteCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'cliente_updated_at',
    nullable: true,
  })
  clienteUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cliente_deleted_at',
    nullable: true,
  })
  clienteDeletedAt: Date | null;

  @OneToMany(() => FacturaEntity, (factura) => factura.cliente)
  facturas: FacturaEntity[];
}

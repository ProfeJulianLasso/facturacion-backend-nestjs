import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { DetalleFacturaEntity } from './detalle-factura.entity';

@ObjectType()
@Index('producto_nombre_deletedAt_Idx', ['deletedAt', 'nombre'], {
  unique: true,
})
@Index('producto_producto_estado_Idx', ['estado'], {})
@Index('pkproducto', ['id'], { unique: true })
@Entity('producto', { schema: 'public' })
export class ProductoEntity {
  @Field(() => String)
  @Column('uuid', {
    primary: true,
    name: 'producto_id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Field(() => String, { description: 'Nombre del producto' })
  @Column('character varying', { name: 'producto_nombre', length: 500 })
  nombre: string;

  @Field(() => Int, { description: 'Valor del producto' })
  @Column('bigint', { name: 'producto_valor' })
  valor: number;

  @Field(() => Boolean)
  @Column('boolean', { name: 'producto_estado', default: () => 'true' })
  estado: boolean;

  @Field(() => Date)
  @Column('timestamp without time zone', {
    name: 'producto_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', {
    name: 'producto_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', {
    name: 'producto_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @Field(() => [DetalleFacturaEntity], { description: 'Detalle de la factura' })
  @OneToMany(
    () => DetalleFacturaEntity,
    (detalleFactura) => detalleFactura.producto,
  )
  detalleFacturas: DetalleFacturaEntity[];
}

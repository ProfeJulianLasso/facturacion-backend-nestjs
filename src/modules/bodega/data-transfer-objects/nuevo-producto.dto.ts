// Libraries
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

// @ArgsType() - Para cuando envío información y esta se usará
// para cualquier cosa que no sea guardar información en el servidor

// @InputType() - Para cuando necesito guardar información en el servidor

@InputType()
export class NuevoProductoDTO {
  @Field(() => String, { description: 'Nombre del producto' })
  @IsString()
  @Length(3, 500)
  nombre: string;

  @Field(() => Int, { description: 'Valor del producto' })
  @IsNumber()
  @IsPositive()
  valor: number;
}

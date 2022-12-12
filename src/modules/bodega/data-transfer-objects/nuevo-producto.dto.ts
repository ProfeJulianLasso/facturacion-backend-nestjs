// Libraries
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class NuevoProducto {
  @IsString()
  @Length(3, 500)
  nombre: string;

  @IsNumber()
  @IsPositive()
  valor: number;
}

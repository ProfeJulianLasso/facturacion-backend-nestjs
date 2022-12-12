import { Module } from '@nestjs/common';
import { VentasController } from './controllers/ventas.controller';
import { VentasService } from './services/ventas.service';
import { CommonModule } from '../../common/common.module';

@Module({
  controllers: [VentasController],
  imports: [CommonModule],
  providers: [VentasService],
})
export class VentasModule {}

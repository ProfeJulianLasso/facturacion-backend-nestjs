import { Module } from '@nestjs/common';
import { BodegaController } from './controllers/bodega.controller';
import { BodegaService } from './services/bodega.service';
import { CommonModule } from '../../common/common.module';

@Module({
  controllers: [BodegaController],
  imports: [CommonModule],
  providers: [BodegaService],
})
export class BodegaModule {}

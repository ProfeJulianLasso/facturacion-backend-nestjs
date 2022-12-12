import { Module } from '@nestjs/common';
import { ClienteController } from './controllers/cliente.controller';
import { ClienteService } from './services/cliente.service';
import { CommonModule } from '../../common/common.module';

@Module({
  controllers: [ClienteController],
  imports: [CommonModule],
  providers: [ClienteService],
})
export class ClienteModule {}

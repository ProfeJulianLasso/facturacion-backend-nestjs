// Libraries
import { Repository, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

// Entities
import { FacturaEntity } from '../entities';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(FacturaEntity)
    private readonly facturaRepository: Repository<FacturaEntity>,
  ) {}

  async create(factura: FacturaEntity): Promise<FacturaEntity> {
    return await this.facturaRepository.save(factura);
  }

  async update(id: string, factura: FacturaEntity): Promise<FacturaEntity> {
    let facturaToUpdate = await this.facturaRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (facturaToUpdate) {
      facturaToUpdate = { ...facturaToUpdate, ...factura };
      return await this.facturaRepository.save(facturaToUpdate);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async delete(id: string): Promise<FacturaEntity> {
    const facturaToDelete = await this.facturaRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (facturaToDelete) {
      facturaToDelete.deletedAt = new Date();
      return await this.facturaRepository.save(facturaToDelete);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async findAll(): Promise<FacturaEntity[]> {
    return await this.facturaRepository.findBy({ deletedAt: IsNull() });
  }

  async findOneById(id: string): Promise<FacturaEntity> {
    const factura = await this.facturaRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (factura) return factura;
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }
}

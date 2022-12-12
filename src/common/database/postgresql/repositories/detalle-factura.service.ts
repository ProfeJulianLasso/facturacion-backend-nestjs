// Libraries
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

// Entities
import { DetalleFacturaEntity } from '../entities';

@Injectable()
export class DetalleFacturaService {
  constructor(
    @InjectRepository(DetalleFacturaEntity)
    private readonly detalleFacturaRepository: Repository<DetalleFacturaEntity>,
  ) {}

  async create(
    detalleFactura: DetalleFacturaEntity,
  ): Promise<DetalleFacturaEntity> {
    return await this.detalleFacturaRepository.save(detalleFactura);
  }

  async update(
    id: string,
    detalleFactura: DetalleFacturaEntity,
  ): Promise<DetalleFacturaEntity> {
    let detalleFacturaToUpdate = await this.detalleFacturaRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (detalleFacturaToUpdate) {
      detalleFacturaToUpdate = { ...detalleFacturaToUpdate, ...detalleFactura };
      return await this.detalleFacturaRepository.save(detalleFacturaToUpdate);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async delete(id: string): Promise<DetalleFacturaEntity> {
    const detalleFacturaToDelete =
      await this.detalleFacturaRepository.findOneBy({
        id,
        deletedAt: IsNull(),
      });
    if (detalleFacturaToDelete) {
      detalleFacturaToDelete.deletedAt = new Date();
      return await this.detalleFacturaRepository.save(detalleFacturaToDelete);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async findAll(): Promise<DetalleFacturaEntity[]> {
    return await this.detalleFacturaRepository.findBy({ deletedAt: IsNull() });
  }

  async findOneById(id: string): Promise<DetalleFacturaEntity> {
    const detalleFactura = await this.detalleFacturaRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (detalleFactura) return detalleFactura;
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }
}

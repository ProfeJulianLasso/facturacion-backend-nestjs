// Libraries
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

// Entities
import { DescuentoEntity } from '../entities';

@Injectable()
export class DescuentoService {
  constructor(
    @InjectRepository(DescuentoEntity)
    private readonly descuentoRepository: Repository<DescuentoEntity>,
  ) {}

  async create(descuento: DescuentoEntity): Promise<DescuentoEntity> {
    return await this.descuentoRepository.save(descuento);
  }

  async update(
    id: string,
    descuento: DescuentoEntity,
  ): Promise<DescuentoEntity> {
    let descuentoToUpdate = await this.descuentoRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (descuentoToUpdate) {
      descuentoToUpdate = { ...descuentoToUpdate, ...descuento };
      return await this.descuentoRepository.save(descuentoToUpdate);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async delete(id: string): Promise<DescuentoEntity> {
    const descuentoToDelete = await this.descuentoRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (descuentoToDelete) {
      descuentoToDelete.deletedAt = new Date();
      return await this.descuentoRepository.save(descuentoToDelete);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async findAll(): Promise<DescuentoEntity[]> {
    return await this.descuentoRepository.findBy({ deletedAt: IsNull() });
  }

  async findOneById(id: string): Promise<DescuentoEntity> {
    const descuento = await this.descuentoRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (descuento) return descuento;
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }
}

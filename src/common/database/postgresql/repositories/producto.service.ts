// Libraries
import { Repository, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

// Entities
import { ProductoEntity } from '../entities';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}

  async create(producto: ProductoEntity): Promise<ProductoEntity> {
    return await this.productoRepository.save(producto);
  }

  async update(id: string, producto: ProductoEntity): Promise<ProductoEntity> {
    let productoToUpdate = await this.productoRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (productoToUpdate) {
      productoToUpdate = { ...productoToUpdate, ...producto };
      return await this.productoRepository.save(productoToUpdate);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async delete(id: string): Promise<ProductoEntity> {
    const productoToDelete = await this.productoRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (productoToDelete) {
      productoToDelete.deletedAt = new Date();
      return await this.productoRepository.save(productoToDelete);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async findAll(): Promise<ProductoEntity[]> {
    return await this.productoRepository.findBy({ deletedAt: IsNull() });
  }

  async findOneById(id: string): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (producto) return producto;
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }
}

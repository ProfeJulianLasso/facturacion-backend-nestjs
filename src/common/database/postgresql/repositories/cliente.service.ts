// Libraries
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

// Entities
import { ClienteEntity } from '../entities';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clientRepository: Repository<ClienteEntity>,
  ) {}

  async create(client: ClienteEntity): Promise<ClienteEntity> {
    return await this.clientRepository.save(client);
  }

  async update(id: string, client: ClienteEntity): Promise<ClienteEntity> {
    let clienteToUpdate = await this.clientRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (clienteToUpdate) {
      clienteToUpdate = { ...clienteToUpdate, ...client };
      return await this.clientRepository.save(clienteToUpdate);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async activated(id: string): Promise<ClienteEntity> {
    return await this.activedDeactivatedTogether(id, true);
  }

  async deactivated(id: string): Promise<ClienteEntity> {
    return await this.activedDeactivatedTogether(id, false);
  }

  async delete(id: string): Promise<ClienteEntity> {
    const clienteToDelete = await this.clientRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (clienteToDelete) {
      clienteToDelete.deletedAt = new Date();
      return await this.clientRepository.save(clienteToDelete);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  async findAll(): Promise<ClienteEntity[]> {
    return await this.clientRepository.findBy({ deletedAt: IsNull() });
  }

  async findOneById(id: string): Promise<ClienteEntity> {
    const cliente = await this.clientRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (cliente) return cliente;
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }

  private async activedDeactivatedTogether(
    id: string,
    estado: boolean,
  ): Promise<ClienteEntity> {
    const clienteToDeactivate = await this.clientRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (clienteToDeactivate) {
      clienteToDeactivate.estado = estado;
      clienteToDeactivate.updatedAt = new Date();
      return await this.clientRepository.save(clienteToDeactivate);
    }
    throw new BadRequestException(`El ID "${id} no existe en base de datos`);
  }
}

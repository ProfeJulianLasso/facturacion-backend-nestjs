// Configs
import { PostgreSQLConfig as ConfigDataBase } from './postgresql/postgresql.config';

// Entities
import {
  ClienteEntity,
  DescuentoEntity,
  DetalleFacturaEntity,
  FacturaEntity,
  ProductoEntity,
} from './postgresql/entities';

// Repositories
import {
  ClienteService,
  DescuentoService,
  DetalleFacturaService,
  FacturaService,
  ProductoService,
} from './postgresql/repositories';

export {
  ConfigDataBase,
  ClienteEntity,
  DescuentoEntity,
  DetalleFacturaEntity,
  FacturaEntity,
  ProductoEntity,
  ClienteService,
  DescuentoService,
  DetalleFacturaService,
  FacturaService,
  ProductoService,
};

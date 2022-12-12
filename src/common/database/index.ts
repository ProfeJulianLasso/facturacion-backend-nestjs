// Configs
import { PostgreSQLConfig } from './postgresql/postgresql.config';

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
  PostgreSQLConfig,
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

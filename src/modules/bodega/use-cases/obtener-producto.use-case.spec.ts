import { Test, TestingModule } from '@nestjs/testing';
import { ObtenerProductoUseCase } from './obtener-producto.use-case';

describe('ObtenerProductosUseCase', () => {
  let useCase: ObtenerProductoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObtenerProductoUseCase],
    }).compile();

    useCase = module.get<ObtenerProductoUseCase>(ObtenerProductoUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});

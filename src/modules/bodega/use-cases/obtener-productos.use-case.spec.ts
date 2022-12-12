import { Test, TestingModule } from '@nestjs/testing';
import { ObtenerProductosUseCase } from './obtener-productos.use-case';

describe('ObtenerProductosUseCase', () => {
  let useCase: ObtenerProductosUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObtenerProductosUseCase],
    }).compile();

    useCase = module.get<ObtenerProductosUseCase>(ObtenerProductosUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});

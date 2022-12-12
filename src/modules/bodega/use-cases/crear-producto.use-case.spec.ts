import { Test, TestingModule } from '@nestjs/testing';
import { CrearProductoUseCase } from './crear-producto.use-case';

describe('CrearProductoUseCase', () => {
  let useCase: CrearProductoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrearProductoUseCase],
    }).compile();

    useCase = module.get<CrearProductoUseCase>(CrearProductoUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});

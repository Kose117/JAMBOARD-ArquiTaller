// src/application/useCases/product/getProductById.useCase.ts
import { IProductRepository} from '../../../domain/repositories/product.repository';
import { BaseProduct }        from '../../../domain/entities/product.entity';

export class GetProductByIdUseCase {
  constructor(private readonly repo: IProductRepository) {}

  async execute(id: string): Promise<BaseProduct | null> {
    return this.repo.findById(id);
  }
}

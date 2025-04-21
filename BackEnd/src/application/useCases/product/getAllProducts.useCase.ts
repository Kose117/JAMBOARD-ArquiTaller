// src/application/useCases/product/getAllProducts.useCase.ts

import { IProductRepository} from '../../../domain/repositories/product.repository';
import { BaseProduct }        from '../../../domain/entities/product.entity';

export class GetAllProductsUseCase {
  constructor(private readonly repo: IProductRepository) {}

  async execute(): Promise<BaseProduct[]> {
    return this.repo.findAll();
  }
}

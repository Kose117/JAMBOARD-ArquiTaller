// src/application/useCases/product/getProductsByUser.useCase.ts

import { IProductRepository} from '../../../domain/repositories/product.repository';
import { BaseProduct }        from '../../../domain/entities/product.entity';

export class GetProductsByUserUseCase {
  constructor(private readonly repo: IProductRepository) {}
  async execute(userId: string): Promise<BaseProduct[]> {
    return this.repo.findByUserId(userId);
  }
}

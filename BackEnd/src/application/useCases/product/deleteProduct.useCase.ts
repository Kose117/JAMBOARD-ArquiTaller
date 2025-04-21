// src/application/useCases/product/deleteProduct.useCase.ts

import { IProductRepository} from '../../../domain/repositories/product.repository';

export class DeleteProductUseCase {
  constructor(private readonly repo: IProductRepository) {}

  /**
   * Lanza error o simplemente resuelve void
   */
  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

// src/application/useCases/product/updateProduct.useCase.ts
import { IProductRepository} from '../../../domain/repositories/product.repository';
import { BaseProduct }        from '../../../domain/entities/product.entity';

export class UpdateProductUseCase {
  constructor(private readonly repo: IProductRepository) {}

  /**
   * data puede contener cualquier subconjunto de campos de BaseProduct (sin 'id')
   */
  async execute(
    id: string,
    data: Partial<Omit<BaseProduct, 'id'>>
  ): Promise<BaseProduct | null> {
    return this.repo.update(id, data);
  }
}

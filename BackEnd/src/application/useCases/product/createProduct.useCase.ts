// src/application/useCases/product/createProduct.useCase.ts
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { BaseProduct }        from '../../../domain/entities/product.entity';
import { CreateProductDto }   from '../../dtos/product.dto';

export class CreateProductUseCase {
  constructor(private readonly repo: IProductRepository) {}

  /**
   * Crea un producto asignándole siempre el userId que viene del token
   */
  async execute(
    userId: string,
    data: CreateProductDto
  ): Promise<BaseProduct> {
    // Construyo la entidad de dominio sin id
    const toCreate: Omit<BaseProduct, 'id'> = {
      userId,
      name:           data.name,
      price:          data.price,
      quantity:       data.quantity,
      expirationDate: data.expirationDate
    };

    return this.repo.create(toCreate);
  }
}

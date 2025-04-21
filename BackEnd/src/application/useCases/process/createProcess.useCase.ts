// src/application/useCases/process/createProcess.useCase.ts

import { IProcessRepository } from '../../../domain/repositories/process.repository';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { CreateProcessDto }    from '../../dtos/process.dto';
import { BaseProcess }         from '../../../domain/entities/process.entity';

export class CreateProcessUseCase {
  constructor(
    private readonly processRepo: IProcessRepository,
    private readonly productRepo: IProductRepository
  ) {}

  /**
   * Crea un proceso calculando totalAmount y usando siempre el userId del token
   */
  async execute(
    userId: string,
    dto: CreateProcessDto
  ): Promise<BaseProcess> {
    // 1. Obtener precio de cada producto
    const itemsWithPrices = await Promise.all(
      dto.items.map(async item => {
        const product = await this.productRepo.findById(item.productId);
        if (!product) throw new Error(`Producto ${item.productId} no encontrado`);
        return { ...item, price: product.price };
      })
    );

    // 2. Calcular totalAmount
    const totalAmount = itemsWithPrices.reduce(
      (sum, it) => sum + it.quantity * it.price,
      0
    );

    // 3. Construir la entidad sin id
    const toCreate: Omit<BaseProcess, 'id'> = {
      userId,
      items:              dto.items,
      totalAmount,
      startDate:          dto.startDate,
      deliveryDate:       dto.deliveryDate,
      progressPercentage: dto.progressPercentage,
      status:             dto.status
    };

    // 4. Persistir
    return this.processRepo.create(toCreate);
  }
}

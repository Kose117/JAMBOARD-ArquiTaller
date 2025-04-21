// src/domain/irepositories/product.repository.ts

import { BaseProduct } from '../entities/product.entity';

export interface IProductRepository {
  /** Devuelve todos los productos como entidades de dominio */
  findAll(): Promise<BaseProduct[]>;
  /** Busca un producto por su id */
  findById(id: string): Promise<BaseProduct | null>;
  findByUserId(userId: string): Promise<BaseProduct[]>;
  /** Crea un producto (sin id) y devuelve la entidad creada */
  create(data: Omit<BaseProduct, 'id'>): Promise<BaseProduct>;
  /** Actualiza campos parciales (sin id) y devuelve la entidad o null si no existe */
  update(
    id: string,
    data: Partial<Omit<BaseProduct, 'id'>>
  ): Promise<BaseProduct | null>;
  /** Elimina un producto por id */
  delete(id: string): Promise<void>;
}

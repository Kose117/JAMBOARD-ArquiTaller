// src/infrastructure/database/repositories/product.repository.ts

import { Types } from 'mongoose';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { BaseProduct } from '../../../domain/entities/product.entity';
import { ProductModel, ProductLean } from '../models/product.model';

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<BaseProduct[]> {
    const docs = await ProductModel.find().lean<ProductLean[]>().exec();
    return docs.map(doc => this.toDomain(doc));
  }

  async findById(id: string): Promise<BaseProduct | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await ProductModel.findById(id).lean<ProductLean>().exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findByUserId(userId: string): Promise<BaseProduct[]> {
    if (!Types.ObjectId.isValid(userId)) return [];
    const docs = await ProductModel
      .find({ userId: new Types.ObjectId(userId) })
      .lean<ProductLean[]>()
      .exec();
    return docs.map(doc => this.toDomain(doc));
  }

  async create(data: Omit<BaseProduct, 'id'>): Promise<BaseProduct> {
    const created = await ProductModel.create(data);
    const doc = created.toObject() as ProductLean;
    return this.toDomain(doc);
  }

  async update(
    id: string,
    data: Partial<Omit<BaseProduct, 'id'>>
  ): Promise<BaseProduct | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await ProductModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean<ProductLean>()
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) return;
    await ProductModel.findByIdAndDelete(id).exec();
  }

  /** Mapea un objeto lean (POJO) a la entidad de dominio */
  private toDomain(doc: ProductLean): BaseProduct {
    return {
      id:             doc._id.toHexString(),
      userId:         (doc.userId as Types.ObjectId).toHexString(),
      name:           doc.name,
      price:          doc.price,
      quantity:       doc.quantity,
      expirationDate: doc.expirationDate
    };
  }
}

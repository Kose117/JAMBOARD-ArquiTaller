// src/infrastructure/database/repositories/process.repository.ts

import { Types } from "mongoose";
import { IProcessRepository } from "../../../domain/repositories/process.repository";
import { BaseProcess } from "../../../domain/entities/process.entity";
import { ProcessModel, ProcessLean } from "../models/process.model";

export class ProcessRepository implements IProcessRepository {
  async findAll(): Promise<BaseProcess[]> {
    const docs = await ProcessModel.find().lean<ProcessLean[]>().exec();
    return docs.map(this.toDomain);
  }

  async findById(id: string): Promise<BaseProcess | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await ProcessModel.findById(id).lean<ProcessLean>().exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findByUserId(userId: string): Promise<BaseProcess[]> {
    if (!Types.ObjectId.isValid(userId)) return [];
    const docs = await ProcessModel.find({ userId: new Types.ObjectId(userId) })
      .lean<ProcessLean[]>()
      .exec();
    return docs.map(this.toDomain);
  }

  async create(data: Omit<BaseProcess, "id">): Promise<BaseProcess> {
    const created = await ProcessModel.create(data);
    const doc = created.toObject() as ProcessLean;
    return this.toDomain(doc);
  }

  async update(
    id: string,
    data: Partial<Omit<BaseProcess, "id">>
  ): Promise<BaseProcess | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await ProcessModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .lean<ProcessLean>()
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) return;
    await ProcessModel.findByIdAndDelete(id).exec();
  }

  /** Mapea un ProcessLean a BaseProcess */
  private toDomain(doc: ProcessLean): BaseProcess {
    return {
      id: doc._id.toHexString(),
      userId: (doc.userId as Types.ObjectId).toHexString(),
      items: doc.items.map((item) => ({
        productId: item.productId.toHexString(),
        quantity: item.quantity,
      })),
      totalAmount: doc.totalAmount as number,
      startDate: doc.startDate as Date,
      deliveryDate: doc.deliveryDate as Date,
      progressPercentage: doc.progressPercentage as number,
      status: doc.status as BaseProcess['status']
    };
  }
}

// src/infrastructure/database/models/process.model.ts

import { Schema, model, Document, Types, InferSchemaType } from 'mongoose';

// 1) Definición del esquema con todos los campos de BaseProcess
const ProcessSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        productId: {
          type: Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    startDate: {
      type: Date,
      required: true
    },
    deliveryDate: {
      type: Date,
      required: true
    },
    progressPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['OPERATING', 'SENT', 'DELIVERED'],
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        // Expone `id` en lugar de `_id`
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// 2) Infiero automáticamente los tipos TS del esquema
type ProcessSchemaType = InferSchemaType<typeof ProcessSchema>;

// 3) Documento completo de Mongoose incluyendo timestamps
export interface ProcessDocument extends ProcessSchemaType, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// 4) Versión "lean" (POJO) para .lean()
export type ProcessLean = Omit<ProcessDocument, keyof Document> & {
  _id: Types.ObjectId;
};

// 5) Exportar el modelo
export const ProcessModel = model<ProcessDocument>('Process', ProcessSchema);

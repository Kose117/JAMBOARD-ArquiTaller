// src/application/dtos/process.dto.ts

import { Type, Static } from '@sinclair/typebox';

// 1. ENUMERACIONES Y SUBESQUEMAS
export const ProcessStatusEnum = Type.Union([
  Type.Literal('OPERATING'),
  Type.Literal('SENT'),
  Type.Literal('DELIVERED')
], { title: 'ProcessStatus' });
export type ProcessStatus = Static<typeof ProcessStatusEnum>;

export const ProcessItemSchema = Type.Object({
  productId: Type.String({ format: 'uuid' }),
  quantity:  Type.Number({ minimum: 1 })
});
export type ProcessItemDto = Static<typeof ProcessItemSchema>;

// 2. LO QUE ENTRA: creación y actualización
export const CreateProcessSchema = Type.Object({
  items:              Type.Array(ProcessItemSchema, { minItems: 1 }),
  startDate:          Type.Date(),
  deliveryDate:       Type.Date(),
  progressPercentage: Type.Number({ minimum: 0, maximum: 100 }),
  status:             ProcessStatusEnum
});
export type CreateProcessDto = Static<typeof CreateProcessSchema>;

export const UpdateProcessSchema = Type.Partial(CreateProcessSchema, {
  description: 'Campos opcionales para actualizar un proceso'
});
export type UpdateProcessDto = Static<typeof UpdateProcessSchema>;

// 3. LO QUE SALE: respuesta de un proceso o lista
export const ProcessResponseSchema = Type.Object({
  id:                 Type.String({ format: 'uuid' }),
  userId:             Type.String({ format: 'uuid' }),
  items:              Type.Array(ProcessItemSchema),
  totalAmount:        Type.Number(),
  startDate:          Type.Date(),
  deliveryDate:       Type.Date(),
  progressPercentage: Type.Number(),
  status:             ProcessStatusEnum,
});
export type ProcessResponseDto = Static<typeof ProcessResponseSchema>;

export const ProcessesListSchema = Type.Object({
  processes: Type.Array(ProcessResponseSchema)
});
export type ProcessesListDto = Static<typeof ProcessesListSchema>;

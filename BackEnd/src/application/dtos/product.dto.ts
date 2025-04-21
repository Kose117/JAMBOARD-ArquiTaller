// src/application/dtos/product.dto.ts

import { Type, Static } from '@sinclair/typebox';

// 1. LO QUE ENTRA: creación y actualización
export const CreateProductSchema = Type.Object({
  name:           Type.String(),
  price:          Type.Number(),           // USD, decimal
  quantity:       Type.Number(),           // stock disponible
  expirationDate: Type.Date()              // fecha futura
});
export type CreateProductDto = Static<typeof CreateProductSchema>;

export const UpdateProductSchema = Type.Partial(CreateProductSchema, {
  description: 'Campos opcionales para actualizar un producto'
});
export type UpdateProductDto = Static<typeof UpdateProductSchema>;


// 2. LO QUE SALE: respuesta de un producto o lista

export const ProductResponseSchema = Type.Object({
  id:             Type.String(),           // virtual de Mongo
  userId:         Type.String(),
  name:           Type.String(),
  price:          Type.Number(),
  quantity:       Type.Number(),
  expirationDate: Type.Date()
});
export type ProductResponseDto = Static<typeof ProductResponseSchema>;

export const ProductsListSchema = Type.Object({
  products: Type.Array(ProductResponseSchema)
});
export type ProductsListDto = Static<typeof ProductsListSchema>;

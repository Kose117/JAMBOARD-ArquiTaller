export interface BaseProduct {
  id: string;
  userId: string;       // propietario
  name: string;
  price: number;        // USD, decimal
  quantity: number;     // stock disponible
  expirationDate: Date;
}

export type Product = BaseProduct;
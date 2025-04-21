// src/infrastructure/controllers/product.controller.ts
import { Request, Response, NextFunction } from 'express';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  GetProductsByUserUseCase,
} from '../../application/useCases/product';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
  ProductsListDto
} from '../../application/dtos/product.dto';

export class ProductController {
  constructor(
    private readonly createUseCase: CreateProductUseCase,
    private readonly getAllUseCase: GetAllProductsUseCase,
    private readonly getByIdUseCase: GetProductByIdUseCase,
    private readonly updateUseCase: UpdateProductUseCase,
    private readonly deleteUseCase: DeleteProductUseCase,
    private readonly getByUserUseCase: GetProductsByUserUseCase,
  ) {}

  

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user!.id;      
      const dto = req.body as CreateProductDto;
      const product = await this.createUseCase.execute(userId,dto);
      res.status(201).json(this.toResponseDto(product));
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const products = await this.getAllUseCase.execute();
      res.status(200).json(this.toListDto(products));
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.getByIdUseCase.execute(id);
      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(this.toResponseDto(product));
    } catch (error) {
      next(error);
    }
  };

  public getByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log('getByUser', req.user);
      const userId = req.user!.id;
      console.log('userId', userId);
      const products = await this.getByUserUseCase.execute(userId);
      res.status(200).json(this.toListDto(products));
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const dto = req.body as UpdateProductDto;
      const product = await this.updateUseCase.execute(id, dto);
      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(this.toResponseDto(product));
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteUseCase.execute(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  // --- Helper interno para mapear BaseProduct a ProductResponseDto ---
  private toResponseDto(product: any): ProductResponseDto {
    return {
      id:             product.id,
      userId:         product.userId,
      name:           product.name,
      price:          product.price,
      quantity:       product.quantity,
      expirationDate: product.expirationDate,
    };
  }

  // --- Helper interno para mapear arreglo de BaseProduct a ProductsListDto ---
  private toListDto(products: any[]): ProductsListDto {
    return {
      products: products.map(p => this.toResponseDto(p))
    };
  }
}

// src/infrastructure/controllers/process.controller.ts

import { Request, Response, NextFunction } from "express";
import {
  CreateProcessUseCase,
  GetAllProcessesUseCase,
  GetProcessByIdUseCase,
  GetProcessesByUserUseCase,
  UpdateProcessUseCase,
  DeleteProcessUseCase,
} from "../../application/useCases/process";
import {
  CreateProcessDto,
  UpdateProcessDto,
  ProcessResponseDto,
  ProcessesListDto,
} from "../../application/dtos/process.dto";
import { BaseProcess } from "../../domain/entities/process.entity";

export class ProcessController {
  constructor(
    private readonly createUseCase: CreateProcessUseCase,
    private readonly getAllUseCase: GetAllProcessesUseCase,
    private readonly getByIdUseCase: GetProcessByIdUseCase,
    private readonly getByUserUseCase: GetProcessesByUserUseCase,
    private readonly updateUseCase: UpdateProcessUseCase,
    private readonly deleteUseCase: DeleteProcessUseCase
  ) {}

  // Helper interno: mapea BaseProcess a ProcessResponseDto
  private toResponseDto(process: BaseProcess): ProcessResponseDto {
    return {
      id: process.id,
      userId: process.userId,
      items: process.items,
      totalAmount: process.totalAmount,
      startDate: process.startDate,
      deliveryDate: process.deliveryDate,
      progressPercentage: process.progressPercentage,
      status: process.status,
    };
  }

  // Helper interno: mapea arreglo de BaseProcess a ProcessesListDto
  private toListDto(processes: BaseProcess[]): ProcessesListDto {
    return {
      processes: processes.map((p) => this.toResponseDto(p)),
    };
  }

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user!.id; // Obtener el ID del usuario desde el token JWT
      const dto = req.body as CreateProcessDto;
      const process = await this.createUseCase.execute(userId, dto);
      res.status(201).json(this.toResponseDto(process));
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
      const processes = await this.getAllUseCase.execute();
      res.status(200).json(this.toListDto(processes));
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
      const userId = req.user!.id;
      const processes = await this.getByUserUseCase.execute(userId);
      res.status(200).json(this.toListDto(processes));
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
      const process = await this.getByIdUseCase.execute(id);
      if (!process) {
        res.status(404).json({ message: "Process not found" });
        return;
      }
      res.status(200).json(this.toResponseDto(process));
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
      const dto = req.body as UpdateProcessDto;
      const process = await this.updateUseCase.execute(id, dto);
      if (!process) {
        res.status(404).json({ message: "Process not found" });
        return;
      }
      res.status(200).json(this.toResponseDto(process));
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
}

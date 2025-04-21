// src/infrastructure/controllers/user.controller.ts

import { Request, Response, NextFunction } from "express";
import {
  CreateOperatorUseCase,
  CreateAdminUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from "../../application/useCases/user";
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UsersListDto,
} from "../../application/dtos/user.dto";

export class UserController {
  constructor(
    private readonly createOperatorUseCase: CreateOperatorUseCase,
    private readonly createAdminUseCase: CreateAdminUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  public createOperator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dto = req.body as CreateUserDto;
      const user = await this.createOperatorUseCase.execute(dto);
      res.status(201).json(this.toResponseDto(user));
    } catch (error) {
      next(error);
    }
  };

  public createAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dto = req.body as CreateUserDto;
      const user = await this.createAdminUseCase.execute(dto);
      res.status(201).json(this.toResponseDto(user));
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
      const users = await this.getAllUsersUseCase.execute();

      const response: UsersListDto = {
        users: users.map((u) => ({
          id: u.id,
          email: u.email,
          userType: u.userType,
        })),
      };

      res.status(200).json(response);
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
      const user = await this.getUserByIdUseCase.execute(id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const response: UserResponseDto = {
        id: user.id,
        email: user.email,
        userType: user.userType,
      };

      res.status(200).json(response);
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
      const userId = req.user!.id;  
      const updateDto = req.body as UpdateUserDto;
      const user = await this.updateUserUseCase.execute(userId, updateDto);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const response: UserResponseDto = {
        id: user.id,
        email: user.email,
        userType: user.userType,
      };

      res.status(200).json(response);
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
      const userId = req.user!.id;
      await this.deleteUserUseCase.execute(userId);
      // No devolvemos cuerpo, solo 204 No Content
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  // Helper interno
  private toResponseDto(user: any): UserResponseDto {
    return {
      id:       user.id,
      email:    user.email,
      userType: user.userType
    };
  }
}

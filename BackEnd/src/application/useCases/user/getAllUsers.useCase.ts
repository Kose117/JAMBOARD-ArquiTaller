// src/application/useCases/user/getAllUsers.useCase.ts

import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BaseUser } from '../../../domain/entities/user.entity';

export class GetAllUsersUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(): Promise<BaseUser[]> {
    return this.userRepo.findAll();
  }
}

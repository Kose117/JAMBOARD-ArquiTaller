// src/application/useCases/user/getUserById.useCase.ts

import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BaseUser } from '../../../domain/entities/user.entity';

export class GetUserByIdUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string): Promise<BaseUser | null> {
    return this.userRepo.findById(id);
  }
}

// src/application/useCases/user/deleteUser.useCase.ts
import { IUserRepository } from '../../../domain/repositories/user.repository';

export class DeleteUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}

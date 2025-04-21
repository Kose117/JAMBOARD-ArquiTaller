// src/application/useCases/user/updateUser.useCase.ts

import bcrypt from 'bcryptjs';
import config from '../../../infrastructure/config';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BaseUser } from '../../../domain/entities/user.entity';

export class UpdateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  /**
   * Ejecuta la actualización de un usuario.
   * Si viene data.password, lo hashea con bcrypt antes de guardar.
   */
  async execute(
    id: string,
    data: Partial<Omit<BaseUser, 'id'>>
  ): Promise<BaseUser | null> {
    // Si se envía nueva contraseña, la hasheamos
    if (data.password) {
      const hashed = await bcrypt.hash(
        data.password,
        config.jwt.saltRounds
      );
      data = { ...data, password: hashed };
    }

    return this.userRepo.update(id, data);
  }
}

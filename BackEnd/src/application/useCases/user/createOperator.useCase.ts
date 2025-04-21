import bcrypt from 'bcryptjs';
import config from '../../../infrastructure/config';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { CreateUserDto } from '../../dtos/user.dto';
import { BaseUser, UserType } from '../../../domain/entities/user.entity';

export class CreateOperatorUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  /**
   * Crea un usuario con rol OPERATOR
   * y encripta la contraseña antes de guardarla.
   */
  async execute(dto: CreateUserDto): Promise<BaseUser> {
    // 1. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(
      dto.password,
      config.jwt.saltRounds
    );

    // 2. Construir la entidad sin id
    const toCreate: Omit<BaseUser, 'id'> = {
      email:    dto.email,
      password: hashedPassword,
      userType: 'OPERATOR' as UserType
    };

    // 3. Persistir en repositorio
    return this.userRepo.create(toCreate);
  }
}
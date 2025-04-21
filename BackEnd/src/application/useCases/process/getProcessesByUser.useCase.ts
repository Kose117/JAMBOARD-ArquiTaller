
import { IProcessRepository } from '../../../domain/repositories/process.repository';
import { BaseProcess } from '../../../domain/entities/process.entity';

export class GetProcessesByUserUseCase {
  constructor(private readonly repo: IProcessRepository) {}

  async execute(userId: string): Promise<BaseProcess[]> {
    return this.repo.findByUserId(userId);
  }
}
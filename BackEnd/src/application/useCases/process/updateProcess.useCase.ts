// src/application/useCases/process/updateProcess.useCase.ts

import { IProcessRepository } from '../../../domain/repositories/process.repository';
import { BaseProcess } from '../../../domain/entities/process.entity';
import { UpdateProcessDto } from '../../dtos/process.dto';

export class UpdateProcessUseCase {
  constructor(private readonly repo: IProcessRepository) {}

  async execute(
    id: string,
    data: UpdateProcessDto
  ): Promise<BaseProcess | null> {
    return this.repo.update(id, data as Partial<Omit<BaseProcess, 'id'>>);
  }
}
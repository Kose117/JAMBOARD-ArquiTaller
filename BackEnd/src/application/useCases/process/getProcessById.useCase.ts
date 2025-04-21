// src/application/useCases/process/getProcessById.useCase.ts

import { IProcessRepository } from '../../../domain/repositories/process.repository';
import { BaseProcess } from '../../../domain/entities/process.entity';

export class GetProcessByIdUseCase {
  constructor(private readonly repo: IProcessRepository) {}

  async execute(id: string): Promise<BaseProcess | null> {
    return this.repo.findById(id);
  }
}


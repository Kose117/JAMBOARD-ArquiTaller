// src/application/useCases/process/getAllProcesses.useCase.ts

import { IProcessRepository } from '../../../domain/repositories/process.repository';
import { BaseProcess } from '../../../domain/entities/process.entity';

export class GetAllProcessesUseCase {
  constructor(private readonly repo: IProcessRepository) {}

  async execute(): Promise<BaseProcess[]> {
    return this.repo.findAll();
  }
}
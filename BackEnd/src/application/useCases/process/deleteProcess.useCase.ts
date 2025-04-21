// src/application/useCases/process/deleteProcess.useCase.ts

import { IProcessRepository } from '../../../domain/repositories/process.repository';

export class DeleteProcessUseCase {
  constructor(private readonly repo: IProcessRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

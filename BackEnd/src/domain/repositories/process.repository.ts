// src/domain/irepositories/process.repository.ts
import { BaseProcess } from '../entities/process.entity';

export interface IProcessRepository {
  /** Devuelve todos los procesos como entidades de dominio */
  findAll(): Promise<BaseProcess[]>;
  /** Busca un proceso por su id */
  findById(id: string): Promise<BaseProcess | null>;
  /** Busca todos los procesos de un usuario */
  findByUserId(userId: string): Promise<BaseProcess[]>;
  /** Crea un proceso (sin id) y devuelve la entidad creada */
  create(data: Omit<BaseProcess, 'id'>): Promise<BaseProcess>;
  /**
   * Actualiza campos parciales (sin id) de un proceso y devuelve la entidad o null si no existe
   */
  update(
    id: string,
    data: Partial<Omit<BaseProcess, 'id'>>
  ): Promise<BaseProcess | null>;
  /** Elimina un proceso por id */
  delete(id: string): Promise<void>;
}


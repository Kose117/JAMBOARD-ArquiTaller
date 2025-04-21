// src/domain/irepositories/user.repository.ts
import { BaseUser } from "../entities";

export interface IUserRepository {
  /** Devuelve todos los usuarios como entidades de dominio */
  findAll(): Promise<BaseUser[]>;
  /** Busca un usuario por su id */
  findById(id: string): Promise<BaseUser | null>;
  /** Busca un usuario por su email */
  findByEmail(email: string): Promise<BaseUser | null>;
  /** Crea un usuario (sin id) y devuelve la entidad creada */
  create(user: Omit<BaseUser, 'id'>): Promise<BaseUser>;
  /**
   * Actualiza los campos pasados (pueden ser parciales de BaseUser sin el id)
   * Devuelve la entidad actualizada o null si no existe
   */
  update(
    id: string,
    data: Partial<Omit<BaseUser, 'id'>>
  ): Promise<BaseUser | null>;
  /** Elimina un usuario por id */
  delete(id: string): Promise<void>;
}

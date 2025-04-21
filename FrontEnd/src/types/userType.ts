export type UserType = 'ADMIN' | 'OPERATOR';

export interface User {
  id: string;
  email: string;
  avatar: string;
  type: UserType;
  password: string;
}
export type CreateUserInput = Omit<User, 'id'>;

export type UpdateUserInput = Partial<Omit<User, 'id'>>;

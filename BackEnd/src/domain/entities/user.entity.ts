export type UserType = 'OPERATOR' | 'ADMIN';

export interface BaseUser {
  id: string;
  email: string;
  password: string;
  userType: UserType;
}

export type User = BaseUser;
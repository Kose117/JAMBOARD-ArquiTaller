import { Type, Static } from '@sinclair/typebox';

// 1. LO QUE ENTRA: creación y actualización
export const CreateUserSchema = Type.Object({
  email:    Type.String({ format: 'email' }),
  password: Type.String(),
});
export type CreateUserDto = Static<typeof CreateUserSchema>;


export const UpdateUserSchema = Type.Partial(CreateUserSchema, {
  description: 'Campos opcionales para actualizar un usuario'
});
export type UpdateUserDto = Static<typeof UpdateUserSchema>;


// 2. LO QUE SALE: respuesta de un usuario o lista
export const UserResponseSchema = Type.Object({
  id: Type.String(), // viene del virtual JSON
  email: Type.String({ format: 'email' }),
  userType: Type.Union([
    Type.Literal('OPERATOR'),
    Type.Literal('ADMIN')
  ]),
});
export type UserResponseDto = Static<typeof UserResponseSchema>;

export const UsersListSchema = Type.Object({
  users: Type.Array(UserResponseSchema)
});
export type UsersListDto = Static<typeof UsersListSchema>;

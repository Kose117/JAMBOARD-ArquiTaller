import type { User } from '@/types';

export const USERS_REQ = 'USERS_REQ' as const;
export const USERS_OK = 'USERS_OK' as const;
export const USERS_ERR = 'USERS_ERR' as const;

export const USER_ADD_REQ = 'USER_ADD_REQ' as const;
export const USER_ADD_OK = 'USER_ADD_OK' as const;
export const USER_ADD_ERR = 'USER_ADD_ERR' as const;

export const usersReq = () => ({ type: USERS_REQ });
export const usersOk = (p: User[]) => ({ type: USERS_OK, payload: p });
export const usersErr = (e: string) => ({ type: USERS_ERR, error: e });

export const userAddReq = () => ({ type: USER_ADD_REQ });
export const userAddOk = (u: User) => ({ type: USER_ADD_OK, payload: u });
export const userAddErr = (e: string) => ({ type: USER_ADD_ERR, error: e });

import type { User } from '@/types';

export const AUTH_REQ = 'AUTH_REQ' as const;
export const AUTH_OK = 'AUTH_OK' as const;
export const AUTH_ERR = 'AUTH_ERR' as const;
export const LOGOUT = 'LOGOUT' as const;

export const authReq = () => ({ type: AUTH_REQ });
export const authOk = (u: User) => ({ type: AUTH_OK, payload: u });
export const authErr = (e: string) => ({ type: AUTH_ERR, error: e });
export const logoutA = () => ({ type: LOGOUT });

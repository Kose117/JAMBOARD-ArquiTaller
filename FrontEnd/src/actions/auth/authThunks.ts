import { authApi } from '@/lib/api/authApi';
import { AppDispatcher } from '@/dispatcher/AppDispatcher';
import { authReq, authOk, authErr, logoutA } from './authActions';
import type { User, LoginInput } from '@/types';

const norm = (u: any): User => {
    const { userType, ...rest } = u;
    return { ...rest, type: userType };
};

export const loadUser = async () => {
    AppDispatcher.dispatch(authReq());
    try {
        const { data } = await authApi.get('/auth/me');
        AppDispatcher.dispatch(authOk(norm(data)));
    } catch (e) {
        AppDispatcher.dispatch(authErr((e as Error).message));
    }
};

export const login = async (cred: LoginInput) => {
    AppDispatcher.dispatch(authReq());
    try {
        await authApi.post('/auth/login', cred);
        await loadUser();
    } catch (e) {
        AppDispatcher.dispatch(authErr((e as Error).message));
    }
};

export const logout = async () => {
    try {
        await authApi.post('/auth/logout');
    } finally {
        AppDispatcher.dispatch(logoutA());
    }
};

export const register = async (payload: { email: string; password: string }) => {
    AppDispatcher.dispatch(authReq());
    try {
        await authApi.post('/user/operador', payload);
        await authApi.post('/auth/login', payload);
        await loadUser();
    } catch (e) {
        AppDispatcher.dispatch(authErr((e as Error).message));
    }
};

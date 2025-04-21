import {
    loadUser,
    login as loginThunk,
    logout as logoutThunk,
    register as registerThunk,
} from '@/actions/auth/authThunks';
import type { LoginInput } from '@/types';

export const useAuthActions = () => ({
    loadUser,
    login: (email: string, password: string) =>
        loginThunk({ email, password } as LoginInput),
    logout: logoutThunk,
    register: (email: string, password: string) =>
        registerThunk({ email, password }),
});

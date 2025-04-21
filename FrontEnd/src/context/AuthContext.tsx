import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/hooks/flux/auth/useAuthStore';
import { useAuthActions } from '@/hooks/flux/auth/useAuthActions';

interface IAuthContext {
    user: ReturnType<typeof useAuthStore>['user'];
    loading: ReturnType<typeof useAuthStore>['loading'];
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    createAccount: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user, loading } = useAuthStore();
    const { loadUser, login, logout, register } = useAuthActions();

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                createAccount: register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): IAuthContext => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext must be inside AuthProvider');
    return ctx;
};

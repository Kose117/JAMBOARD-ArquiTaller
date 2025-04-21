import { useSyncExternalStore } from 'react';
import { authStore } from '@/stores/AuthStore';

export const useAuthStore = () =>
    useSyncExternalStore(
        (callback) => {
            authStore.on(callback);
            return () => authStore.off(callback);
        },
        () => authStore.getState()
    );

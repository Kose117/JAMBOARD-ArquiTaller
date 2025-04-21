import { useSyncExternalStore } from 'react';
import { userStore } from '@/stores/UserStore';

export const useUserStore = () =>
    useSyncExternalStore(
        (cb) => {
            userStore.addChangeListener(cb);
            return () => userStore.removeChangeListener(cb);
        },
        () => userStore.getState()
    );

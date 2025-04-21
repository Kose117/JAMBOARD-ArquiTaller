import { useSyncExternalStore } from 'react';
import { productStore } from '@/stores/ProductStore';

export const useProductStore = () =>
    useSyncExternalStore(
        (cb) => {
            productStore.addChangeListener(cb);
            return () => productStore.removeChangeListener(cb);
        },
        () => productStore.getState()
    );

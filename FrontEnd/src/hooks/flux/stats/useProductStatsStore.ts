import { useSyncExternalStore } from 'react';
import { productStatsStore } from '@/stores/ProductStatsStore';

export const useProductStatsStore = () =>
    useSyncExternalStore(
        (cb) => {
            productStatsStore.addChangeListener(cb);
            return () => productStatsStore.removeChangeListener(cb);
        },
        () => productStatsStore.getState()
    );

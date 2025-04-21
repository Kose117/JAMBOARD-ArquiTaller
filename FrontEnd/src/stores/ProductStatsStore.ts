import { SimpleEventEmitter, Listener } from '@/lib/utils/eventEmitter';
import { AppDispatcher } from '@/dispatcher/AppDispatcher';
import {
    STATS_REQUEST,
    STATS_SUCCESS,
    STATS_FAILURE,
} from '@/actions/stats/productStatsActions';
import type { ProductStatsDto } from '@/types/statsTypes';

interface State {
    loading: boolean;
    data?: ProductStatsDto;
    error?: string;
}
let state: State = { loading: false };

class ProductStatsStore {
    private emitter = new SimpleEventEmitter();

    addChangeListener(fn: Listener) {
        this.emitter.on(fn);
    }
    removeChangeListener(fn: Listener) {
        this.emitter.off(fn);
    }
    getState(): State {
        return state;
    }

    handle = (action: any) => {
        switch (action.type) {
            case STATS_REQUEST:
                state = { loading: true };
                break;
            case STATS_SUCCESS:
                state = { loading: false, data: action.payload };
                break;
            case STATS_FAILURE:
                state = { loading: false, error: action.error };
                break;
        }
        this.emitter.emit();
    };
}

export const productStatsStore = new ProductStatsStore();
AppDispatcher.register(productStatsStore.handle);

import { AppDispatcher } from '@/dispatcher/AppDispatcher';
import {
    PROD_REQ, PROD_OK, PROD_ERR,
    PROD_ADD_OK, PROD_UPD_OK, PROD_DEL_OK,
} from '@/actions/product/productActions';
import type { Product } from '@/types/productType';
import { SimpleEventEmitter, Listener } from '@/lib/utils/eventEmitter';

type State = { loading: boolean; products: Product[]; error?: string };
let state: State = { loading: false, products: [] };

export class ProductStore {
    private emitter = new SimpleEventEmitter();

    addChangeListener(fn: Listener) { this.emitter.on(fn); }
    removeChangeListener(fn: Listener) { this.emitter.off(fn); }

    getState(): State { return state; }

    handle = (action: any) => {
        switch (action.type) {
            case PROD_REQ:
                state = { ...state, loading: true };
                break;
            case PROD_OK:
                state = { loading: false, products: action.payload };
                break;
            case PROD_ADD_OK:
                state = { ...state, products: [...state.products, action.payload] };
                break;
            case PROD_UPD_OK:
                state = {
                    ...state,
                    products: state.products.map(p =>
                        p.id === action.payload.id ? action.payload : p
                    ),
                };
                break;
            case PROD_DEL_OK:
                state = {
                    ...state,
                    products: state.products.filter(p => p.id !== action.payload),
                };
                break;
            case PROD_ERR:
                state = { loading: false, products: [], error: action.error };
                break;
        }
        this.emitter.emit();
    };
}

export const productStore = new ProductStore();
AppDispatcher.register(productStore.handle.bind(productStore));

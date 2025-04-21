import { axiosApi } from '@/lib/api/axios';
import { AppDispatcher } from '@/dispatcher/AppDispatcher';
import {
    productsReq, productsOk, productsErr,
    productAddOk, productUpdateOk, productDelOk,
} from './productActions';
import type { Product } from '@/types/productType';

/* ---------- helpers ---------- */

const unwrap = (r: any): Product[] =>
    Array.isArray(r.products) ? r.products : r;

/* ---------- thunks ---------- */

export const loadUserProducts = async () => {
    AppDispatcher.dispatch(productsReq());
    try {
        const { data } = await axiosApi.get<{ products: Product[] }>('/product/user');
        console.log(data);
        AppDispatcher.dispatch(productsOk(unwrap(data)));
    } catch (e) {
        AppDispatcher.dispatch(productsErr((e as Error).message));
    }
};

export const addProduct = async (payload: Omit<Product, 'id' | 'userId'>) => {
    const { data } = await axiosApi.post<Product>('/product', payload);
    AppDispatcher.dispatch(productAddOk(data));
};

export const updateProduct = async (id: string, partial: Partial<Product>) => {
    const { data } = await axiosApi.patch<Product>(`/product/${id}`, partial);
    AppDispatcher.dispatch(productUpdateOk(data));
};

export const deleteProduct = async (id: string) => {
    await axiosApi.delete(`/product/${id}`);
    AppDispatcher.dispatch(productDelOk(id));
};

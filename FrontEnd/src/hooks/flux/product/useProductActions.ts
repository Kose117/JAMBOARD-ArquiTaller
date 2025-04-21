import {
    loadUserProducts,
    updateProduct,
    deleteProduct,
    addProduct
} from '@/actions/product/productThunks';

export const useProductActions = () => ({
    loadUserProducts,
    updateProduct,
    deleteProduct,
    addProduct,
});
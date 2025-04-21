import type { Product } from '@/types/productType';

export const PROD_REQ = 'PROD_REQ' as const;
export const PROD_OK = 'PROD_OK' as const;
export const PROD_ERR = 'PROD_ERR' as const;

export const PROD_ADD_OK = 'PROD_ADD_OK' as const;
export const PROD_UPD_OK = 'PROD_UPD_OK' as const;
export const PROD_DEL_OK = 'PROD_DEL_OK' as const;

export const productsReq = () => ({ type: PROD_REQ });
export const productsOk = (list: Product[]) => ({ type: PROD_OK, payload: list });
export const productsErr = (e: string) => ({ type: PROD_ERR, error: e });

export const productAddOk = (p: Product) => ({ type: PROD_ADD_OK, payload: p });
export const productUpdateOk = (p: Product) => ({ type: PROD_UPD_OK, payload: p });
export const productDelOk = (id: string) => ({ type: PROD_DEL_OK, payload: id });

import { AppDispatcher } from '@/dispatcher/AppDispatcher';
import {
    statsRequest,
    statsSuccess,
    statsFailure,
} from './productStatsActions';
import { axiosApi as axios } from '@/lib/api/axios';
import type { ProductStatsDto } from '@/types/statsTypes';

export const loadStats = async (from: string, to: string) => {
    AppDispatcher.dispatch(statsRequest());
    try {
        const { data } = await axios.get<ProductStatsDto>(
            '/stats/products',
            { params: { from, to } }
        );
        console.log(data);
        AppDispatcher.dispatch(statsSuccess(data));
    } catch (e) {
        AppDispatcher.dispatch(
            statsFailure((e as Error).message)
        );
    }
};

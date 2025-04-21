import type { ProductStatsDto } from '@/types/statsTypes';

export const STATS_REQUEST = 'STATS_REQUEST' as const;
export const STATS_SUCCESS = 'STATS_SUCCESS' as const;
export const STATS_FAILURE = 'STATS_FAILURE' as const;

export const statsRequest = () => ({ type: STATS_REQUEST });
export const statsSuccess = (payload: ProductStatsDto) => ({
    type: STATS_SUCCESS,
    payload,
});
export const statsFailure = (error: string) => ({
    type: STATS_FAILURE,
    error,
});

import { ProductStatsDto } from '../../application/dtos/stats/productStats.dto';

export interface IProductStatsRepository {
    aggregateProductStats(userId: string, from: Date, to: Date): Promise<ProductStatsDto>;
}

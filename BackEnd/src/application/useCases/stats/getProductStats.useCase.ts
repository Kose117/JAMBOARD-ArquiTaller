import { IProductStatsRepository } from "../../../domain/repositories/productStats.repository";

export class GetProductStatsUseCase {
    constructor(private repo: IProductStatsRepository) { }

    execute(userId: string, from: Date, to: Date) {
        return this.repo.aggregateProductStats(userId, from, to);
    }
}

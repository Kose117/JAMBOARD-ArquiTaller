import { Request, Response, NextFunction } from "express";
import { GetProductStatsUseCase } from "../../application/useCases/stats/getProductStats.useCase";

export class StatsController {
    constructor(private readonly getStats: GetProductStatsUseCase) { }

    getProductStats = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { from, to } = req.query;
            if (!from || !to) {
                return res.status(400).json({ message: "from/to required" });
            }

            const userId = req.user!.id;
            const data = await this.getStats.execute(
                userId,
                new Date(from as string),
                new Date(to as string)
            );

            res.json(data);
        } catch (e) {
            next(e);
        }
    };
}

import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';

import { StatsRepositoryImpl } from '../../infrastructure/database/repositories/stats.repository.impl';
import { GetProductStatsUseCase } from '../../application/useCases/stats/getProductStats.useCase';

const repo = new StatsRepositoryImpl();
const uc = new GetProductStatsUseCase(repo);
const ctrl = new StatsController(uc);

const router = Router();
router.get(
    '/products',
    validateRoleMiddleware(["ADMIN", "OPERATOR"]),
    ctrl.getProductStats,
);

export default router;

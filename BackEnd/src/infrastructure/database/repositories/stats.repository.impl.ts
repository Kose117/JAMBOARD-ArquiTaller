import { ProcessModel } from '../models/process.model';   // tu esquema Mongoose
import { IProductStatsRepository } from '../../../domain/repositories/productStats.repository';
import { ProductStatsDto } from '../../../application/dtos/stats/productStats.dto';
import { differenceInCalendarDays, subMonths } from 'date-fns';
import { Types } from 'mongoose';

export class StatsRepositoryImpl implements IProductStatsRepository {
    async aggregateProductStats(
        userId: string,
        from: Date,
        to: Date
    ): Promise<ProductStatsDto> {

        const uid = new Types.ObjectId(userId);

        // Normalizamos a medianoche UTC
        const toUtc = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
        from = toUtc(from);
        to = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate() + 1));

        /* ---------------- Tarjetas (rango actual y anterior) ---------------- */
        const prevFrom = subMonths(from, 1);
        const prevTo = subMonths(to, 1);

        async function cardsRange(f: Date, t: Date) {
            const [res] = await ProcessModel.aggregate([
                { $match: { userId: uid, status: 'DELIVERED', deliveryDate: { $gte: f, $lt: t } } },
                {
                    $facet: {
                        orders: [{ $group: { _id: null, count: { $sum: 1 }, sales: { $sum: '$totalAmount' } } }],
                        items: [
                            { $unwind: '$items' },
                            { $group: { _id: null, qty: { $sum: '$items.quantity' } } },
                        ],
                    },
                },
                {
                    $project: {
                        orders: { $arrayElemAt: ['$orders', 0] },
                        items: { $arrayElemAt: ['$items', 0] },
                    },
                },
            ]);
            return {
                totalSales: res?.orders?.sales ?? 0,
                productsSold: res?.items?.qty ?? 0,
                deliveredOrders: res?.orders?.count ?? 0,
            };
        }

        const now = await cardsRange(from, to);
        const prev = await cardsRange(prevFrom, prevTo);

        const avgNow = now.deliveredOrders ? now.totalSales / now.deliveredOrders : 0;
        const avgPrev = prev.deliveredOrders ? prev.totalSales / prev.deliveredOrders : 0;

        /* ---------------- Pie series (status) ---------------- */
        const pieAgg = await ProcessModel.aggregate([
            { $match: { userId: uid, startDate: { $gte: from, $lt: to } } },
            { $group: { _id: '$status', value: { $sum: 1 } } },
        ]);
        const pieSeries = ['OPERATING', 'SENT', 'DELIVERED'].map(s => ({
            name: s.charAt(0) + s.slice(1).toLowerCase(),   // label bonito
            value: pieAgg.find(p => p._id === s)?.value ?? 0,
        }));

        /* ---------------- Top‑5 productos y line / bar -------------------- */
        // 1. total qty por producto en rango
        const topProducts = await ProcessModel.aggregate([
            { $match: { userId: uid, deliveryDate: { $gte: from, $lt: to }, status: 'DELIVERED' } },
            { $unwind: '$items' },
            { $lookup: { from: 'products', localField: 'items.productId', foreignField: '_id', as: 'prod' } },
            { $unwind: '$prod' },
            { $group: { _id: '$prod.name', total: { $sum: '$items.quantity' } } },
            { $sort: { total: -1 } },
            { $limit: 5 },
        ]);

        const productNames = topProducts.map(p => p._id);

        // 2. granularidad
        const days = differenceInCalendarDays(to, from);
        const format =
            days <= 7 ? '%Y-%m-%d' :          // día
                days <= 45 ? '%Y-%V' :          // semana
                    days <= 365 ? '%Y-%m' :          // mes
                        days <= 3650 ? '%Y' :          // año
                            '%Y-%u';                           // década

        // 3. serie temporal
        const lineAgg = await ProcessModel.aggregate([
            { $match: { userId: uid, deliveryDate: { $gte: from, $lt: to }, status: 'DELIVERED' } },
            { $unwind: '$items' },
            { $lookup: { from: 'products', localField: 'items.productId', foreignField: '_id', as: 'prod' } },
            { $unwind: '$prod' },
            { $match: { 'prod.name': { $in: productNames } } },
            {
                $group: {
                    _id: {
                        bucket: { $dateToString: { format, date: '$deliveryDate' } },
                        product: '$prod.name',
                    },
                    qty: { $sum: '$items.quantity' },
                },
            },
            {
                $group: {
                    _id: '$_id.bucket',
                    series: { $push: { k: '$_id.product', v: '$qty' } },
                },
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    data: { $arrayToObject: '$series' },
                },
            },
        ]);

        const lineSeries = lineAgg.map(d => ({ date: d.date, ...d.data }));

        const barChartData = topProducts.map(p => ({ name: p._id, total: p.total }));

        /* ---------------- Build DTO ---------------- */
        return {
            cards: {
                totalSales: {
                    title: 'Ventas Totales',
                    value: now.totalSales,
                    previousValue: prev.totalSales,
                },
                productsSold: {
                    title: 'Productos Vendidos',
                    value: now.productsSold,
                    previousValue: prev.productsSold,
                },
                avgOrderValue: {
                    title: 'Valor Promedio de Pedido',
                    value: avgNow,
                    previousValue: avgPrev,
                },
                deliveredOrders: {
                    title: 'Procesos Entregados',
                    value: now.deliveredOrders,
                    previousValue: prev.deliveredOrders,
                },
            },
            lineSeries,
            pieSeries,
            barChartData,
        };
    }
}

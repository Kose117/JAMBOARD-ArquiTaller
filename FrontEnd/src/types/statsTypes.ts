export const LINE_COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#f87171', '#38bdf8', '#34d399',
];

export const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export type LinePoint = {
    date: string;
    [seriesName: string]: string | number;
};

export type PieSlice = { name: string; value: number };

export interface CardMetric {
    title: string;
    value: number;
    previousValue: number;
}

export interface CardStats {
    title: string;
    value: string | number;
    description: string;
    icon?: React.ReactNode;
}

export interface ProductStatsDto {
    cards: {
        totalSales: CardMetric;
        productsSold: CardMetric;
        avgOrderValue: CardMetric;
        deliveredOrders: CardMetric;
    };
    lineSeries: LinePoint[];
    pieSeries: PieSlice[];
    barChartData: { name: string; total: number }[];
}

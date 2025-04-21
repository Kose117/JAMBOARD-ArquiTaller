export interface CardMetricDto {
    title: string;
    value: number;
    previousValue: number;
}

export interface ProductStatsDto {
    cards: {
        totalSales: CardMetricDto;
        productsSold: CardMetricDto;
        avgOrderValue: CardMetricDto;
        deliveredOrders: CardMetricDto;     // card #4
    };
    lineSeries: { date: string; products: { [productName: string]: number } }[];
    pieSeries: { name: string; value: number }[];           // status distribution
    barChartData: { name: string; total: number }[];         // top‑5 productos
}

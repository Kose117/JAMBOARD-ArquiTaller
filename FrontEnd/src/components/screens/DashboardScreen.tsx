import { useEffect, useMemo, useState } from 'react';
import { formatISO, startOfDay, subMonths } from 'date-fns';
import {
  ArrowUpRight,
  CalendarSync,
  CheckCircle,
  XCircle,
} from 'lucide-react';

import DashboardTemplate from '../templates/DashBoardTemplate';
import type { StatsCardProps } from '@/components/molecules/Stats-card';
import { useProductStatsStore } from '@/hooks/flux/stats/useProductStatsStore';
import { useProductStatsActions } from '@/hooks/flux/stats/useProductStatsActions';

export default function DashboardScreen() {
  // 1. date‐picker range
  const [range, setRange] = useState({
    from: startOfDay(subMonths(new Date(), 1)),
    to: startOfDay(new Date()),
  });

  // 2. store & actions
  const { loading, data } = useProductStatsStore();
  const { loadStats } = useProductStatsActions();

  // 3. reload on range change
  useEffect(() => {
    loadStats(
      formatISO(range.from, { representation: 'date' }),
      formatISO(range.to, { representation: 'date' })
    );
  }, [range, loadStats]);

  // 4. map store → template props
  const cardsData: StatsCardProps[] = useMemo(() => {
    if (!data) return [];

    const order = [
      data.cards.totalSales,      // index 0 → money
      data.cards.productsSold,    // index 1 → count
      data.cards.avgOrderValue,   // index 2 → money
      data.cards.deliveredOrders, // index 3 → percent
    ];
    const icons = [
      <CalendarSync className="h-4 w-4 text-muted-foreground" />,
      <CheckCircle className="h-4 w-4 text-green-500" />,
      <XCircle className="h-4 w-4 text-red-500" />,
      <ArrowUpRight className="h-4 w-4 text-blue-500" />,
    ] as const;

    return order.map((c, i) => {
      const diff = c.value - c.previousValue;
      const pct = c.previousValue
        ? Math.round((diff / c.previousValue) * 1000) / 10
        : 0;

      let displayValue: string | number;
      if (i === 0 || i === 2) {
        displayValue = `$${c.value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      } else if (i === 3) {
        displayValue = `${c.value.toFixed(1)} %`;
      } else {
        displayValue = c.value.toLocaleString();
      }

      return {
        title: c.title,
        value: displayValue,
        description: `${diff >= 0 ? '+' : ''}${pct}% vs mes anterior`,
        icon: icons[i],
      };
    });
  }, [data]);

  return (
    <DashboardTemplate
      cardsData={cardsData}
      barChartData={data?.barChartData ?? []}
      pieSeries={data?.pieSeries ?? []}
      lineSeries={data?.lineSeries ?? []}
      range={range}
      onRangeChange={setRange}
      loading={loading}
    />
  );
}

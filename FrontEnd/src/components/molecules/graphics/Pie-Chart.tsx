import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { PieSlice, PIE_COLORS } from '@/types/statsTypes';
import React from 'react';

const RAD = Math.PI / 180;
const renderLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: any) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      fontSize="12"
      fontWeight="bold"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

// simple translation map
const LEGEND_LABELS: Record<string, string> = {
  Operating: 'Operando',
  Sent: 'Enviado',
  Delivered: 'Entregado',
};

export const PieChartComponent: React.FC<{
  data: PieSlice[];
  loading?: boolean;
}> = ({ data, loading }) => {
  const [chartData, setChartData] = React.useState<PieSlice[]>(data);
  React.useEffect(() => {
    if (!loading) setChartData(data);
  }, [data, loading]);

  return (
    <div className="relative flex flex-col items-center w-full">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius="70%"
            labelLine={false}
            label={renderLabel}
          >
            {chartData.map((_, i) => (
              <Cell
                key={i}
                fill={PIE_COLORS[i % PIE_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center mt-4">
        {chartData.map((slice, i) => (
          <div key={i} className="flex items-center mx-2">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
            />
            <span className="text-sm font-medium">
              {LEGEND_LABELS[slice.name] ?? slice.name}
            </span>
          </div>
        ))}
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <span className="animate-pulse text-sm">Cargando…</span>
        </div>
      )}
    </div>
  );
};

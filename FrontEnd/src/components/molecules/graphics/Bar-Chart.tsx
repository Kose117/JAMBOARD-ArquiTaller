import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";

type BarChartComponentProps = {
  data: {
    name: string;
    total: number;
  }[];
};

const pleasantColors = [
  "#A5D8FF", // light blue
  "#B2F2BB", // soft green
  "#FFD6A5", // soft orange
  "#D0BFFF", // light purple
  "#FFADAD", // soft red
  "#CFFAFE", // cyan pastel
  "#E4C1F9", // lavender
  "#FFDAC1", // peach
];

export function BarChartComponent({ data }: BarChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()}`}
        />
        <Tooltip
          formatter={(value: number) => [`Total: ${value.toLocaleString()}`]}
          cursor={{ fill: "#f9f9f9" }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={pleasantColors[index % pleasantColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

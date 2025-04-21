import { StatsGrid } from "@/components/organisms/Stats-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/ui/tabs";
import { BarChartComponent } from "../molecules/graphics/Bar-Chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../atoms/ui/card";
import { LineChartComponent } from "../molecules/graphics/Line-Chart";
import { PieChartComponent } from "../molecules/graphics/Pie-Chart";
import type { StatsCardProps } from "@/components/molecules/Stats-card"
import type { LinePoint, PieSlice } from "@/types/statsTypes"
import { DatePickerWithRange } from "../molecules/Date-range-picker";

export interface DashboardTemplateProps {
  cardsData: StatsCardProps[]
  lineSeries: LinePoint[]
  pieSeries: PieSlice[]
  range: { from: Date; to: Date }
  onRangeChange: (range: { from: Date; to: Date }) => void
  loading?: boolean
  barChartData: {
    name: string;
    total: number;
  }[];

}

export default function DashboardTemplate({
  cardsData,
  lineSeries,
  pieSeries,
  range,
  onRangeChange,
  loading,
  barChartData,
}: DashboardTemplateProps) {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between space-y-2 mb-3">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DatePickerWithRange
            from={range.from}
            to={range.to}
            onChange={onRangeChange}
          />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Analítica</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <StatsGrid cards={cardsData} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Evaluadas</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChartComponent data={lineSeries} loading={loading} />
              </CardContent>
            </Card>
            <Card className="col-span-4 lg:col-span-3">
              <CardHeader>
                <CardTitle>Proporción</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChartComponent data={pieSeries} loading={loading} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total vendido por producto</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent data={barChartData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getMonthDescriptionByNumber } from "@/utils/DateExtensions";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface IEvolutionChartProps {
  data: any[];
  barPropertyName: string;
  barTemplateConfig: ChartConfig;
}

export function EvolutionChart({
  data,
  barPropertyName,
  barTemplateConfig,
}: IEvolutionChartProps) {
  return (
    <ChartContainer config={barTemplateConfig} className="h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => getMonthDescriptionByNumber(value)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey={barPropertyName}
          fill={`var(--color-${barPropertyName})`}
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}

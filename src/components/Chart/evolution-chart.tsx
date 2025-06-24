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

interface IBarProps {
  name: string;
}

export interface IBarChartConfig {
  barsProps: IBarProps[];
  templateConfig: ChartConfig;
}

interface IEvolutionChartProps {
  data: any[];
  barChartConfig: IBarChartConfig;
}

export function EvolutionChart({ data, barChartConfig }: IEvolutionChartProps) {
  return (
    <ChartContainer
      config={barChartConfig.templateConfig}
      className="h-[200px] w-full"
    >
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
        {barChartConfig.barsProps.map((bar) => (
          <Bar
            key={bar.name}
            dataKey={bar.name}
            fill={`var(--color-${bar.name})`}
            radius={4}
          />
        ))}
        {/* <Bar
          dataKey={barPropertyName}
          fill={`var(--color-${barPropertyName})`}
          radius={4}
        /> */}
      </BarChart>
    </ChartContainer>
  );
}

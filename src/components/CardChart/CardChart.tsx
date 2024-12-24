import { Table } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ICardChartProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function CardChart(cardChart: ICardChartProps) {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle>{cardChart.title}</CardTitle>
        </div>
      </CardHeader>
      <CardDescription>{cardChart.description}</CardDescription>
      <CardContent>{cardChart.children}</CardContent>
    </Card>
  );
}

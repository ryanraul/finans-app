import CardChart from "@/components/CardChart/CardChart";
import { EvolutionChart } from "@/components/Chart/evolution-chart";
import FinansTable from "@/components/FinansTable/FinansTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Income from "./types/Income";

const data = [new Income(undefined, 1, "teste", 200, true, new Date())];

export default function Incomes() {
  return (
    <main className="sm:ml-14 w-full p-4 ">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardChart title="Current Incomes" description="">
          <FinansTable caption="Incomes" data={data} />
        </CardChart>

        <CardChart title="Current Incomes" description="">
          <FinansTable caption="A list of your incomes" data={data} />
        </CardChart>
      </section>
      <section className="mt-10">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle>Evolution Incomes</CardTitle>
            </div>
          </CardHeader>
          <CardDescription></CardDescription>
          <CardContent>
            <EvolutionChart />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

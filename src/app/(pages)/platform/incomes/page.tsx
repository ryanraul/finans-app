"use client";

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
import { useEffect, useState } from "react";
import { incomesByAccount } from "./useIncomes";
import { Button } from "@/components/ui/button";
import { IncomesDialog } from "@/components/IncomeDialog/IncomeDialog";

export default function Incomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    incomesByAccount(3).then((response) => {
      if (response.Data?.items) setIncomes(response.Data.items);
    });
  }, []);

  return (
    <main className="sm:ml-14 w-full p-4 ">
      <div className="flex justify-end mb-4">
        <IncomesDialog />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardChart title="Current Incomes" description="">
          <FinansTable
            caption="A list of your current incomes"
            data={incomes}
            withDeleteButton={true}
          />
        </CardChart>

        <CardChart title="Next Incomes" description="">
          <FinansTable
            caption="A list of your next incomes"
            data={incomes}
            withDeleteButton={true}
          />
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

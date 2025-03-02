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
import { useContext, useEffect, useState } from "react";
import { IncomesDialog } from "@/components/IncomeDialog/IncomeDialog";
import {
  deleteIncomesId,
  getIncomes,
  getIncomesGetevolutionincomes,
} from "@/__generated__/api";
import IncomesRequestDto from "./api/IncomesRequestDto";
import { GetEvolutionIncomesResponse } from "@/__generated__/types";
import { ChartConfig } from "@/components/ui/chart";
import { AppContext } from "@/contexts/AppContext";

const chartConfig = {
  total: {
    label: "Total",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function Incomes() {
  const { accountId } = useContext(AppContext);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [evolutionIncomes, setEvolutionIncomes] = useState<
    GetEvolutionIncomesResponse[]
  >([]);

  useEffect(() => {
    getIncomes({ AccountId: accountId! }).then((response) => {
      let lista: Income[] = [];
      response.items.forEach((x) => {
        lista.push(new Income(x));
      });
      if (response?.items) setIncomes(lista);
    });
  }, []);

  useEffect(() => {
    getIncomesGetevolutionincomes({ AccountId: accountId ?? -1 }).then(
      (response) => {
        if (response) setEvolutionIncomes(response);
      }
    );
  }, [incomes, setIncomes]);

  async function deleteIncome(income: Income) {
    if (!income.id) return;

    await deleteIncomesId(income.id);
    setIncomes((prevIncomes) =>
      prevIncomes.filter((prevIncome) => prevIncome.id !== income.id)
    );
  }

  return (
    <main className="sm:ml-14 w-full p-4 ">
      <div className="flex justify-end mb-4">
        <IncomesDialog
          accountId={accountId!}
          onCloseDialog={(infos: any) => {
            // TODO: Update after closing
          }}
        />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardChart title="Current Incomes" description="">
          <FinansTable
            caption="A list of your current incomes"
            data={incomes.filter(
              (income) => income.date?.getMonth() === new Date().getMonth()
            )}
            delete={deleteIncome}
          />
        </CardChart>

        <CardChart title="Next Incomes" description="">
          <FinansTable
            caption="A list of your next incomes"
            data={incomes.filter(
              (income) =>
                income.date?.getMonth() ===
                new Date().setMonth(new Date().getMonth() + 1)
            )}
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
            <EvolutionChart
              data={evolutionIncomes}
              barTemplateConfig={chartConfig}
              barPropertyName="total"
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

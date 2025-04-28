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
import { useCallback, useContext, useState } from "react";
import { IncomesDialog } from "@/components/IncomeDialog/IncomeDialog";
import {
  deleteIncomesId,
  getIncomes,
  getIncomesGetevolutionincomes,
} from "@/__generated__/api";
import { GetEvolutionIncomesResponse } from "@/__generated__/types";
import { ChartConfig } from "@/components/ui/chart";
import { AppContext } from "@/contexts/AppContext";
import { DateRange } from "react-day-picker";
import MonthIncome from "./types/MonthIncome";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { getMonthDescriptionByNumber } from "@/utils/DateExtensions";

const chartConfig = {
  total: {
    label: "Total",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function Incomes() {
  const { accountId } = useContext(AppContext);

  const [evolutionIncomes, setEvolutionIncomes] = useState<
    GetEvolutionIncomesResponse[]
  >([]);
  const [monthsIncomes, setMonthsIncomes] = useState<MonthIncome[]>([]);

  const getIncomesMonths = useCallback((dateRange?: DateRange) => {
    getIncomesGetevolutionincomes({
      AccountId: accountId ?? -1,
      StartDate: dateRange?.from,
      EndDate: dateRange?.to,
    }).then((response) => {
      if (response) setEvolutionIncomes(response);
    });

    getIncomes({
      AccountId: accountId!,
      StartDate: dateRange?.from,
      EndDate: dateRange?.to,
    }).then((response) => {
      let monthExpenses: MonthIncome[] = [];

      response.forEach((x) => {
        let lista: Income[] = [];
        x.incomes.forEach((income) => lista.push(new Income(income)));
        monthExpenses.push(new MonthIncome(x.month, x.year, lista));
      });

      setMonthsIncomes(monthExpenses);
    });
  }, []);

  async function deleteIncome(income: Income) {
    if (!income.id) return;

    await deleteIncomesId(income.id);
    setMonthsIncomes((prevMonthsIncomes) =>
      prevMonthsIncomes.map((prevMonthIncome) => {
        prevMonthIncome.incomes = prevMonthIncome.incomes?.filter(
          (e) => e.id !== income.id
        );

        return prevMonthIncome;
      })
    );
  }

  return (
    <main className="sm:ml-14 w-full p-4 ">
      <div className="flex justify-end mb-4">
        <DatePickerWithRange
          onChangeDates={getIncomesMonths}
          keyForLocalStorage="expense-date-range"
        />
        <IncomesDialog
          accountId={accountId!}
          onCloseDialog={(infos: any) => {
            // TODO: Update after closing
          }}
        />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {monthsIncomes.map((monthExpense) => {
          return (
            monthExpense.incomes && (
              <CardChart
                title={`${getMonthDescriptionByNumber(
                  monthExpense.month
                )} Expenses`}
                description=""
              >
                <FinansTable
                  caption="A list of your current expenses"
                  data={monthExpense.incomes}
                  delete={deleteIncome}
                />
              </CardChart>
            )
          );
        })}
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

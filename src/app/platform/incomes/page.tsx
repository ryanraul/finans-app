"use client";

import CardChart from "@/components/CardChart/CardChart";
import {
  EvolutionChart,
  IBarChartConfig,
} from "@/components/Chart/evolution-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Income from "./types/Income";
import { useCallback, useContext, useState } from "react";
import {
  deleteIncomesId,
  getIncomes,
  getIncomesGetevolutionincomes,
  putIncomes,
} from "@/__generated__/api";
import { GetEvolutionIncomesResponse } from "@/__generated__/types";
import { ChartConfig } from "@/components/ui/chart";
import { AppContext } from "@/contexts/AppContext";
import { DateRange } from "react-day-picker";
import MonthIncome from "./types/MonthIncome";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { getMonthDescriptionByNumber } from "@/utils/DateExtensions";
import { DataTable } from "@/components/DataTable/data-table";
import { IncomesDialog } from "./income-dialog";
import { getIncomeColumns } from "./types/columns";

const barChartConfig: IBarChartConfig = {
  barsProps: [{ name: "total" }],
  templateConfig: {
    total: {
      label: "Total",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig,
};

export default function Incomes() {
  const { accountId } = useContext(AppContext);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>();
  const [updateIncome, setUpdateIncome] = useState<Income | undefined>(
    undefined
  );

  const [evolutionIncomes, setEvolutionIncomes] = useState<
    GetEvolutionIncomesResponse[]
  >([]);
  const [monthsIncomes, setMonthsIncomes] = useState<MonthIncome[]>([]);

  const getIncomesMonths = useCallback((dateRange?: DateRange) => {
    setCurrentDateRange(dateRange);

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

  function editIncome(income: Income) {
    setUpdateIncome(income);
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
          onCloseDialog={() => {
            getIncomesMonths(currentDateRange);
            setUpdateIncome(undefined);
          }}
          updateIncome={updateIncome}
        />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {monthsIncomes.map((monthIncome) => {
          return (
            monthIncome.incomes && (
              <CardChart
                key={`${monthIncome.month}-${monthIncome.year}`}
                title={`${getMonthDescriptionByNumber(
                  monthIncome.month
                )} Incomes`}
                description=""
              >
                <DataTable
                  columns={getIncomeColumns(deleteIncome, editIncome)}
                  data={monthIncome.incomes}
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
              barChartConfig={barChartConfig}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

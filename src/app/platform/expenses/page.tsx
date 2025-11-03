"use client";

import {
  deleteExpensesId,
  getExpenses,
  getExpensesGetEvolutionExpenses,
} from "@/__generated__/api";
import { GetEvolutionExpensesResponse } from "@/__generated__/types";
import { AppContext } from "@/contexts/AppContext";
import { useCallback, useContext, useState } from "react";
import Expense from "./types/Expense";
import { ChartConfig } from "@/components/ui/chart";
import CardChart from "@/components/CardChart/CardChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  EvolutionChart,
  IBarChartConfig,
} from "@/components/Chart/evolution-chart";
import { ExpensesDialog } from "./expense-dialog";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import MonthExpense from "./types/MonthExpense";
import { DateRange } from "react-day-picker";
import { getMonthDescriptionByNumber } from "@/utils/DateExtensions";
import { DataTable } from "@/components/DataTable/data-table";
import { getExpenseColumns } from "./types/columns";

const barChartConfig: IBarChartConfig = {
  barsProps: [{ name: "total" }],
  templateConfig: {
    total: {
      label: "Total",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig,
};

export default function Expenses() {
  const { accountId } = useContext(AppContext);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>();
  const [updateExpense, setUpdateExpense] = useState<Expense | undefined>(
    undefined
  );

  const [evolutionExpenses, setEvolutionExpenses] = useState<
    GetEvolutionExpensesResponse[]
  >([]);
  const [monthsExpenses, setMonthsExpenses] = useState<MonthExpense[]>([]);

  const getExpensesMonths = useCallback((dateRange?: DateRange) => {
    setCurrentDateRange(dateRange);

    getExpensesGetEvolutionExpenses({
      AccountId: accountId ?? -1,
      StartDate: dateRange?.from,
      EndDate: dateRange?.to,
    }).then((response) => {
      if (response) setEvolutionExpenses(response);
    });

    getExpenses({
      AccountId: accountId!,
      StartDate: dateRange?.from,
      EndDate: dateRange?.to,
    }).then((response) => {
      let monthExpenses: MonthExpense[] = [];

      response.forEach((x) => {
        let lista: Expense[] = [];
        x.expenses.forEach((expense) => lista.push(new Expense(expense)));
        monthExpenses.push(new MonthExpense(x.month, x.year, lista));
      });

      setMonthsExpenses(monthExpenses);
    });
  }, []);

  async function deleteExpense(expense: Expense) {
    if (!expense.id) return;

    await deleteExpensesId(expense.id);
    setMonthsExpenses((prevMonthsExpenses) =>
      prevMonthsExpenses.map((prevMonthExpense) => {
        prevMonthExpense.expenses = prevMonthExpense.expenses?.filter(
          (e) => e.id !== expense.id
        );

        return prevMonthExpense;
      })
    );
  }

  function editExpense(expense: Expense) {
    setUpdateExpense(expense);
  }

  return (
    <main className="sm:ml-14 w-full p-4 ">
      <div className="flex justify-end mb-4 gap-3">
        <DatePickerWithRange
          onChangeDates={getExpensesMonths}
          keyForLocalStorage="expense-date-range"
        />
        <ExpensesDialog
          accountId={accountId!}
          onCloseDialog={() => {
            getExpensesMonths(currentDateRange);
            setUpdateExpense(undefined);
          }}
          updateExpense={updateExpense}
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 *:data-[slot=card]:from-primary/4">
        {monthsExpenses.map((monthExpense) => {
          return (
            monthExpense.expenses && (
              <CardChart
                key={`${monthExpense.month}-${monthExpense.year}`}
                title={`${getMonthDescriptionByNumber(
                  monthExpense.month
                )} Expenses`}
                description=""
              >
                <DataTable
                  columns={getExpenseColumns(deleteExpense, editExpense)}
                  data={monthExpense.expenses}
                />
              </CardChart>
            )
          );
        })}
      </section>
      <section className="mt-10 *:data-[slot=card]:from-primary/4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle>Evolution Expenses</CardTitle>
            </div>
          </CardHeader>
          <CardDescription></CardDescription>
          <CardContent>
            <EvolutionChart
              data={evolutionExpenses}
              barChartConfig={barChartConfig}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

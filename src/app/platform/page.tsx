"use client";

import CardChart from "@/components/CardChart/CardChart";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { getMonthDescriptionByNumber } from "@/utils/DateExtensions";
import { useContext, useEffect, useState } from "react";
import MonthExpense from "./expenses/types/MonthExpense";
import {
  getBalance,
  getExpenses,
  getExpensesGetEvolutionExpenses,
} from "@/__generated__/api";
import { AppContext } from "@/contexts/AppContext";
import { DateRange } from "react-day-picker";
import Expense from "./expenses/types/Expense";
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
import { ChartConfig } from "@/components/ui/chart";
import {
  GetEvolutionExpensesResponse,
  MonthBalanceResponse,
} from "@/__generated__/types";
import { DataTable } from "@/components/DataTable/data-table";
import BalanceCards from "./balance-cards";
import { getExpenseColumns } from "./expenses/types/columns";

const barChartConfig: IBarChartConfig = {
  barsProps: [{ name: "incomes" }, { name: "expenses" }],
  templateConfig: {
    expenses: {
      label: "Expenses",
      color: "var(--chart-1)",
    },
    incomes: {
      label: "Incomes",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig,
};

interface ExpensesIncomes {
  month: number;
  expenses: number;
  incomes: number;
}

export default function Plataform() {
  const getExpenseMonth = () => {};
  const { accountId } = useContext(AppContext);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [evolutionExpenses, setEvolutionExpenses] = useState<
    GetEvolutionExpensesResponse[]
  >([]);
  const [monthBalance, setMonthBalance] = useState<MonthBalanceResponse>();

  const [monthExpense, setMonthExpenses] = useState<MonthExpense>();
  const [evolutionExpensesIncomes, setEvolutionExpensesIncomes] = useState<
    ExpensesIncomes[]
  >([]);

  useEffect(() => {
    const endDateEvolution = new Date();
    endDateEvolution.setMonth(currentDateRange.from!.getMonth() + 4);
    getExpensesGetEvolutionExpenses({
      AccountId: accountId ?? -1,
      StartDate: currentDateRange?.from,
      EndDate: endDateEvolution,
    }).then((response) => {
      if (response) {
        setEvolutionExpenses(response);
        let listaEvolution: ExpensesIncomes[] = [];

        response.forEach((x) => {
          listaEvolution.push({
            month: x.month,
            expenses: x.total,
            incomes: 1000,
          });
        });

        setEvolutionExpensesIncomes(listaEvolution);
      }
    });

    getExpenses({
      AccountId: accountId!,
      StartDate: currentDateRange?.from,
      EndDate: currentDateRange?.to,
    }).then((response) => {
      let monthExpenses: MonthExpense;

      if (!response) return;

      let monthResponse = response[0];

      let lista: Expense[] = [];
      monthResponse.expenses.forEach((expense) =>
        lista.push(new Expense(expense))
      );
      monthExpenses = new MonthExpense(
        monthResponse.month,
        monthResponse.year,
        lista
      );

      setMonthExpenses(monthExpenses);
    });

    getBalance({
      Month: currentDateRange.from!.getMonth()!,
      Year: currentDateRange.from!.getFullYear()!,
      AccountId: accountId ?? -1,
    }).then((response) => {
      setMonthBalance(response);
    });
  }, []);

  return (
    <main className="sm:ml-14 w-full p-4 ">
      <div className="flex justify-end mb-4 gap-3">
        <DatePickerWithRange
          onChangeDates={getExpenseMonth}
          keyForLocalStorage="expense-date-range"
        />
      </div>

      <BalanceCards monthBalance={monthBalance} />

      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 *:data-[slot=card]:from-primary/4 ">
        <CardChart
          key={`${monthExpense?.month}-${monthExpense?.year}`}
          title={`${getMonthDescriptionByNumber(monthExpense?.month)} Expenses`}
          description=""
        >
          <DataTable
            columns={getExpenseColumns()}
            data={monthExpense?.expenses ?? []}
          />
          <h2>
            Total:{" "}
            {monthExpense?.expenses
              ?.reduce((acc, expense) => acc + (expense.amount ?? 0), 0)
              .toFixed(2)}
          </h2>
        </CardChart>
        <Card className="bg-gradient-to-t">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle>Evolution Expenses</CardTitle>
            </div>
          </CardHeader>
          <CardDescription></CardDescription>
          <CardContent>
            <EvolutionChart
              data={evolutionExpensesIncomes}
              barChartConfig={barChartConfig}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

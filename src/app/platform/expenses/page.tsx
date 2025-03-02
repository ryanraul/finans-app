"use client";

import {
  deleteExpensesId,
  getExpenses,
  getExpensesGetEvolutionExpenses,
} from "@/__generated__/api";
import { GetEvolutionExpensesResponse } from "@/__generated__/types";
import { AppContext } from "@/contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import Expense from "./types/Expense";
import { ChartConfig } from "@/components/ui/chart";
import CardChart from "@/components/CardChart/CardChart";
import FinansTable from "@/components/FinansTable/FinansTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EvolutionChart } from "@/components/Chart/evolution-chart";
import { ExpensesDialog } from "./expense-dialog";

const chartConfig = {
  total: {
    label: "Total",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function Expenses() {
  const { accountId } = useContext(AppContext);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [evolutionExpenses, setEvolutionExpenses] = useState<
    GetEvolutionExpensesResponse[]
  >([]);

  useEffect(() => {
    getExpenses({ AccountId: accountId! }).then((response) => {
      let lista: Expense[] = [];
      response.items.forEach((x) => {
        lista.push(new Expense(x));
      });

      console.log("lista", lista);

      if (response?.items) setExpenses(lista);
    });
  }, []);

  useEffect(() => {
    getExpensesGetEvolutionExpenses({ AccountId: accountId ?? -1 }).then(
      (response) => {
        if (response) setEvolutionExpenses(response);
      }
    );
  }, [expenses, setExpenses]);

  async function deleteExpense(expense: Expense) {
    if (!expense.id) return;

    await deleteExpensesId(expense.id);
    setExpenses((prevExpenses) =>
      prevExpenses.filter((prevExpense) => prevExpense.id !== expense.id)
    );
  }

  return (
    <main className="sm:ml-14 w-full p-4 ">
      <div className="flex justify-end mb-4">
        <ExpensesDialog
          accountId={accountId!}
          onCloseDialog={(infos: any) => {
            // TODO: Update after closing
          }}
        />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardChart title="Current Expenses" description="">
          <FinansTable
            caption="A list of your current incomes"
            data={expenses.filter(
              (expense) =>
                new Date(expense.date!).getMonth() === new Date().getMonth()
            )}
            delete={deleteExpense}
          />
        </CardChart>

        <CardChart title="Next Expenses" description="">
          <FinansTable
            caption="A list of your next incomes"
            data={expenses.filter((expense) => {
              const nextMonth = new Date();
              nextMonth.setMonth(nextMonth.getMonth() + 1);
              return new Date(expense.date!).getMonth() == nextMonth.getMonth();
            })}
          />
        </CardChart>
      </section>
      <section className="mt-10">
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
              barTemplateConfig={chartConfig}
              barPropertyName="total"
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

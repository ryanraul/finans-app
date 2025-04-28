import { ExpenseResponse } from "@/__generated__/types";
import { EnumTableHeaderType } from "../../incomes/types/EnumTableHeaderType";
import { TableHeaderProps } from "../../incomes/types/TableHeaderProps";

export default class Expense
  implements ExpenseResponse, TableType<ExpenseResponse>
{
  constructor(IExpense?: ExpenseResponse);
  constructor(
    idOrIExpense?: ExpenseResponse,
    id?: number,
    description?: string,
    amount?: number,
    fixed?: boolean,
    date?: Date,
    plots?: number
  );
  constructor(
    IExpense?: ExpenseResponse,
    public id?: number,
    public description?: string,
    public amount?: number,
    public fixed?: boolean,
    public date?: Date,
    public plots?: number
  ) {
    if (IExpense) {
      Object.assign(this, IExpense);
      date = new Date(IExpense.date);
    }
  }

  getHeaders() {
    const headers: TableHeaderProps[] = [];

    headers.push(
      {
        key: "description",
        description: "Description",
        type: EnumTableHeaderType.String,
      },
      {
        key: "amount",
        description: "Amount",
        type: EnumTableHeaderType.CurrencyAmount,
      },
      { key: "plots", description: "Plots", type: EnumTableHeaderType.Number }
    );

    // properties.forEach((p) => {
    //   if (p == "id" || p == "date" || p == "fixed") return;
    //   headers.push({ key: p });
    // });

    return headers;
  }

  getCalculableHeaders() {
    const properties = Object.getOwnPropertyNames(this);
    const calculableHeaders: string[] = [];

    properties.forEach((p) => {
      if (p !== "amount") return;
      calculableHeaders.push(p);
    });

    return calculableHeaders;
  }

  getValueByHeader(header: keyof Expense) {
    return this[header];
  }
}

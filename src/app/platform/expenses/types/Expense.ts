import { ExpenseResponse } from "@/__generated__/types";

export default class Expense implements ExpenseResponse {
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
}

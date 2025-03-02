import { GetExpensesResponse } from "@/__generated__/types";

export default class Expense
  implements GetExpensesResponse, TableType<GetExpensesResponse>
{
  constructor(IExpense?: GetExpensesResponse);
  constructor(
    idOrIExpense?: GetExpensesResponse,
    id?: number,
    description?: string,
    amount?: number,
    fixed?: boolean,
    date?: Date,
    plots?: number
  );
  constructor(
    IExpense?: GetExpensesResponse,
    public id?: number,
    public description?: string,
    public amount?: number,
    public fixed?: boolean,
    public date?: Date,
    public plots?: number
  ) {
    if (IExpense) {
      Object.assign(this, IExpense);
      console.log("IExpense.date ==> ", IExpense.date);
      date = new Date(IExpense.date);
      console.log("dateeeee => ", date.getMonth());
    }
  }

  getHeaders() {
    const properties = Object.getOwnPropertyNames(this);
    const headers: string[] = [];

    properties.forEach((p) => {
      if (p == "id" || p == "date" || p == "fixed") return;
      headers.push(p);
    });

    return headers;
  }

  getValueByHeader(header: keyof Expense) {
    return this[header];
  }
}

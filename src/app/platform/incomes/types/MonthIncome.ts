import Income from "./Income";

export default class MonthExpense {
  constructor(
    public month?: number,
    public year?: number,
    public incomes?: Income[]
  ) {}
}

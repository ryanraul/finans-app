import Expense from "./Expense";

export default class MonthExpense {
  constructor(
    public month?: number,
    public year?: number,
    public expenses?: Expense[]
  ) {}
}

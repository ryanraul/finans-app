import { IncomeResponse } from "@/__generated__/types";

export default class Income implements IncomeResponse {
  constructor(iIncome?: IncomeResponse);
  constructor(
    idOrIincome?: IncomeResponse,
    id?: number,
    description?: string,
    amount?: number,
    fixed?: boolean,
    date?: Date
  );
  constructor(
    iIncome?: IncomeResponse,
    public id?: number,
    public description?: string,
    public amount?: number,
    public fixed?: boolean,
    public date?: Date
  ) {
    if (iIncome) {
      Object.assign(this, iIncome);
    }
  }
}

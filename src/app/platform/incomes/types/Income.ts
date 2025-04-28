import { GetIncomesResponse, IncomeResponse } from "@/__generated__/types";
import { TableHeaderProps } from "./TableHeaderProps";

export default class Income
  implements IncomeResponse, TableType<IncomeResponse>
{
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

  getHeaders() {
    const headers: TableHeaderProps[] = [];

    headers.push(
      { key: "description", description: "Description" },
      { key: "amount", description: "Amount" }
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

  getValueByHeader(header: keyof Income) {
    return this[header];
  }
}

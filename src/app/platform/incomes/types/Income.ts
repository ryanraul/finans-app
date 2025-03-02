import { GetIncomesResponse } from "@/__generated__/types";

export default class Income
  implements GetIncomesResponse, TableType<GetIncomesResponse>
{
  constructor(iIncome?: GetIncomesResponse);
  constructor(
    idOrIincome?: GetIncomesResponse,
    id?: number,
    description?: string,
    amount?: number,
    fixed?: boolean,
    date?: Date
  );
  constructor(
    iIncome?: GetIncomesResponse,
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
    const properties = Object.getOwnPropertyNames(this);
    const headers: string[] = [];

    properties.forEach((p) => {
      if (p == "id" || p == "date" || p == "fixed") return;
      headers.push(p);
    });

    return headers;
  }

  getValueByHeader(header: keyof Income) {
    return this[header];
  }
}

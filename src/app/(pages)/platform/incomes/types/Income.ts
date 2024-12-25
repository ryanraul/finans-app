interface IIncome {
  id?: number;
  description?: string;
  amount?: number;
  fixed?: boolean;
  date?: any;
}

export default class Income implements IIncome, TableType<IIncome> {
  constructor(iIncome?: IIncome);
  constructor(
    iIincome?: IIncome,
    id?: number | IIncome,
    description?: string,
    amount?: number,
    fixed?: boolean,
    date?: any
  );
  constructor(
    iIncome?: IIncome,
    public id?: number,
    public description?: string,
    public amount?: number,
    public fixed?: boolean,
    public date?: any
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

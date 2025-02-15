interface ICreateIncomeRequest {
  description?: string;
  amount?: number;
  fixed?: boolean;
  date?: any;
  accountId?: number;
}

export default class CreateIncomeRequest implements ICreateIncomeRequest {
  constructor(
    public description?: string,
    public amount?: number,
    public fixed?: boolean,
    public date?: any,
    public accountId?: number
  ) {}
}

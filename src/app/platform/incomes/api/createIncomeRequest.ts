import { CreateIncomeRequest } from "@/__generated__/types/createIncomeRequest";

export default class CreateIncomeRequestDto implements CreateIncomeRequest {
  constructor(
    public description: string,
    public amount: number,
    public fixed: boolean,
    public date: any,
    public accountId: number
  ) {}
}

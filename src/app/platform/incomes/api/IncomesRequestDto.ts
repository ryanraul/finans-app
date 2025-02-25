import { GetIncomesParams } from "@/__generated__/types/getIncomesParams";

export default class IncomesRequestDto implements GetIncomesParams {
  constructor(
    public AccountId: number,
    public Page: number,
    public PageSize: number
  ) {}
}

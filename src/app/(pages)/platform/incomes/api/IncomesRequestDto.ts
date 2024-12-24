interface IIncomesRequestDto {
  readonly AccountId: number;
  Page: number;
  PageSize: number;
}

export default class IncomesRequestDto implements IIncomesRequestDto {
  constructor(
    public AccountId: number,
    public Page: number,
    public PageSize: number
  ) {}
}

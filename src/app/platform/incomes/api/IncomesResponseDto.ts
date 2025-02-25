import Income from "../types/Income";

interface IIncomesResponseDto {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  items?: Income[];
  page?: number;
  pageSize?: number;
  totalItems?: number;
}

export default class IncomesResponseDto implements IIncomesResponseDto {
  constructor(iIncomesResponseDto?: IIncomesResponseDto);
  constructor(
    iIncomesResponseDto: IIncomesResponseDto,
    public hasNextPage?: boolean,
    public hasPreviousPage?: boolean,
    public items?: Income[],
    public page?: number,
    public pageSize?: number,
    public totalItems?: number
  ) {
    if (iIncomesResponseDto) {
      Object.assign(this, iIncomesResponseDto);
      this.items = [];
      iIncomesResponseDto.items?.forEach((element) => {
        this.items?.push(new Income(element));
      });
    }
  }
}

export interface IApiResponse {
  Data?: any;
  Status?: number;
  ErrorMessage?: string;
}

export default class ApiReponse<T> implements IApiResponse {
  constructor();
  constructor(ErrorMessage: string, Status: number, Data: T);
  constructor(
    public ErrorMessage?: string,
    public Status?: number,
    public Data?: T
  ) {}

  createInstance(classObj: new (data: any) => T): this {
    if (this.Data) this.Data = new classObj(this.Data);
    return this;
  }
}

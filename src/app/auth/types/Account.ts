import { AccountResponse } from "@/__generated__/types";

interface IAccount {
  Id?: number;
  Name?: string;
}

export class Account implements IAccount {
  constructor(accountResponse: AccountResponse);
  constructor(
    public accountResponseOrId?: number | AccountResponse,
    public Name?: string
  ) {
    if (typeof accountResponseOrId !== "number") {
      Object.assign(accountResponseOrId!);
    }
  }
}

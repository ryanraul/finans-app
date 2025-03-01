import { AccountResponse } from "@/__generated__/types";

interface IUser {
  Username?: string;
  Accounts?: AccountResponse[];
}

export class User implements IUser {
  constructor(public Username?: string, public Accounts?: AccountResponse[]) {}
}

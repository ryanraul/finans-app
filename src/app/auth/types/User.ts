interface IUser {
  Username?: string;
}

export class User implements IUser {
  constructor(public Username?: string) {}
}

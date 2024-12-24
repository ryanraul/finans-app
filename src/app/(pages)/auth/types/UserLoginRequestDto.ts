interface IUserLoginRequestDto {
  readonly Username: string;
  readonly Password: string;
}

export default class UserLoginRequestDto implements IUserLoginRequestDto {
  constructor(public Username: string, public Password: string) {}
}

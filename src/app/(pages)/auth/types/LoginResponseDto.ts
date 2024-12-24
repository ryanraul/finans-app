interface ILoginResponseDto {
  readonly token: string;
}

export default class LoginResponseDto implements ILoginResponseDto {
  constructor(public token: string) {}
}

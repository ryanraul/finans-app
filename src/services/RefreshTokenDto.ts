interface IRefreshTokenDto {
  accessToken?: string;
  refreshToken?: string;
}

export default class RefreshTokenDto implements IRefreshTokenDto {
  constructor(public accessToken?: string, public refreshToken?: string) {}
}

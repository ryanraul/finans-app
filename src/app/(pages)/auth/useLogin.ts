import { getUserLogin, setAccessTokenApi } from "./api/logint.api";
import UserLoginRequestDto from "./types/UserLoginRequestDto";

export const login = async (userName: string, password: string) => {
  const userLoginRequest = new UserLoginRequestDto(userName, password);

  return await getUserLogin(userLoginRequest);
};

export const setAccessToken = (accessToken: string) => {
  setAccessTokenApi(accessToken);
};

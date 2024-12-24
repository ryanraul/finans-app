import { FinansAxiosApi } from "@/services/FinansAxiosApi";
import UserLoginRequestDto from "../types/UserLoginRequestDto";
import { getUserLoginHttp } from "./http/login.http";

export const getUserLogin = async (userLoginRequest: UserLoginRequestDto) =>
  await getUserLoginHttp(userLoginRequest);

export const setAccessTokenApi = (accessToken: string) => {
  FinansAxiosApi.setTokenJwt(accessToken);
};

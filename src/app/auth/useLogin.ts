import { postAuthLogin } from "@/__generated__/api";
import { setAccessTokenApi } from "./api/logint.api";
import { LoginRequest } from "@/__generated__/types";

export const login = async (userName: string, password: string) => {
  const loginRequest = {
    username: userName,
    password: password,
  } as LoginRequest;
  return postAuthLogin(loginRequest);
};

export const setAccessToken = (accessToken: string) => {
  setAccessTokenApi(accessToken);
};

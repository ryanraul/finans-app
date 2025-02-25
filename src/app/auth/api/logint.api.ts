import { FinansAxiosApi } from "@/services/FinansAxiosApi";

export const setAccessTokenApi = (accessToken: string) => {
  FinansAxiosApi.setTokenJwt(accessToken);
};

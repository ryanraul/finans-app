import { AxiosRequestConfig } from "axios";
import { FinansAxiosApi } from "./FinansAxiosApi";

export const AXIOS_INSTANCE = FinansAxiosApi.getAxiosInstance();

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => data);

  return promise;
};

import { AxiosRequestConfig } from "axios";
import { FinansAxiosApi } from "./FinansAxiosApi";

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const promise = FinansAxiosApi.getAxiosInstance()({
    ...config,
    ...options,
  }).then(({ data }) => data);

  return promise;
};

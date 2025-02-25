import axios, { AxiosHeaders, AxiosInstance, AxiosRequestHeaders } from "axios";
import ApiResponse from "./ApiResponse";
import { getAuthRefreshToken } from "@/__generated__/api";

export class FinansAxiosApi {
  constructor() {
    FinansAxiosApi.updateConnectionData();
  }

  static jwtBearerToken = "";
  static _retryToken = false;
  static clientHttp: AxiosInstance;

  static setTokenJwt(token: string) {
    this.jwtBearerToken = `Bearer ${token}`;
  }

  static getAxiosInstance() {
    const protocol = "http";
    const port = "5285";
    const server = "localhost:";

    const axiosInstance = axios.create({
      baseURL: `${protocol}://${server}${port}`,
      timeout: 60 * 1000,
      headers: this.getRequestHeaders(),
      withCredentials: true,
    });

    axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && this.jwtBearerToken
          ? `${this.jwtBearerToken}`
          : config.headers.Authorization;

      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          try {
            const response = await getAuthRefreshToken();
            this.setTokenJwt(response.accessToken!);

            originalRequest.headers.Authorization = `Bearer ${response.accessToken!}`;
            originalRequest._retry = true;

            return axiosInstance(originalRequest);
          } catch (e) {
            console.log(`Error interceptor`, e);
          }
        }

        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }

  static getCookie(name: string) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      let [key, value] = cookie.split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  static updateConnectionData() {
    this.clientHttp = FinansAxiosApi.getAxiosInstance();
  }

  static getRequestHeaders(): AxiosRequestHeaders {
    return new AxiosHeaders({
      Accept: "application/json",
      Authorization: this.jwtBearerToken,
    });
  }

  static getErrorResponse(error: any) {
    if (!error.response && error.message) {
      if (error.message.includes("Network Error"))
        return new ApiResponse<undefined>("Network problems...", 0, undefined);

      if (error.message.includes("timeout"))
        return new ApiResponse<undefined>("Timeout error", 0, undefined);
    }

    return new ApiResponse<undefined>("Api Failed", 0, undefined);
  }

  static async post<T>(url: string, data: any) {
    const axiosInstance = this.clientHttp;

    return axiosInstance
      .post(url, data, {
        headers: FinansAxiosApi.getRequestHeaders(),
      })
      .then((response) => {
        return new ApiResponse<T>("", 200, response.data);
      })
      .catch((error) => {
        return FinansAxiosApi.getErrorResponse(error);
      });
  }

  static async get<T>(url: string) {
    return FinansAxiosApi.clientHttp
      .get(url, {
        headers: this.getRequestHeaders(),
      })
      .then((response) => new ApiResponse<T>("", 200, response.data))
      .catch((error) => FinansAxiosApi.getErrorResponse(error));
  }
}

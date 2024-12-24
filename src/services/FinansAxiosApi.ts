import axios, { AxiosHeaders, AxiosInstance, AxiosRequestHeaders } from "axios";
import ApiReponse from "./ApiResponse";
import RefreshTokenDto from "./RefreshTokenDto";

export class FinansAxiosApi {
  constructor() {
    FinansAxiosApi.updateConnectionData();
  }

  static jwtBearerToken = "";
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

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          try {
            const response = await this.get<RefreshTokenDto>(
              "/auth/refreshToken"
            );

            this.setTokenJwt(response.Data?.accessToken!);
            originalRequest.headers.Authorization = `Bearer ${response.Data?.accessToken}`;
            originalRequest._retry = true;

            return axiosInstance(originalRequest);
          } catch {
            console.log(`Error interceptor`);
          }
        }

        return Promise.reject(error);
      }
    );

    return axiosInstance;
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
        return new ApiReponse<undefined>("Network problems...", 0, undefined);

      if (error.message.includes("timeout"))
        return new ApiReponse<undefined>("Timeout error", 0, undefined);
    }

    return new ApiReponse<undefined>("Api Failed", 0, undefined);
  }

  static async post<T>(url: string, data: any) {
    const axiosInstance = this.clientHttp;

    return axiosInstance
      .post(url, data, {
        headers: FinansAxiosApi.getRequestHeaders(),
      })
      .then((response) => {
        return new ApiReponse<T>("", 200, response.data);
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
      .then((response) => new ApiReponse<T>("", 200, response.data))
      .catch((error) => FinansAxiosApi.getErrorResponse(error));
  }
}

import axios, { AxiosHeaders, AxiosRequestHeaders } from "axios";

export class FinansAxiosApi {
  static jwtBearerToken = "";

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

    return axiosInstance;
  }

  static getRequestHeaders(): AxiosRequestHeaders {
    return new AxiosHeaders({
      Accept: "application/json",
      Authorization: this.jwtBearerToken,
    });
  }
}

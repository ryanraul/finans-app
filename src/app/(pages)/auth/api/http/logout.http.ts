import ApiReponse from "@/services/ApiResponse";
import { FinansAxiosApi } from "@/services/FinansAxiosApi";

export const userLogoutHttp = async (): Promise<ApiReponse<undefined>> =>
  FinansAxiosApi.post<undefined>("/auth/logout", undefined)
    .then((response) => response)
    .catch(() => new ApiReponse("", -1, undefined));

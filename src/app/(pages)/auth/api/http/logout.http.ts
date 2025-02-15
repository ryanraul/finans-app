import ApiResponse from "@/services/ApiResponse";
import { FinansAxiosApi } from "@/services/FinansAxiosApi";

export const userLogoutHttp = async (): Promise<ApiResponse<undefined>> =>
  FinansAxiosApi.post<undefined>("/auth/logout", undefined)
    .then((response) => response)
    .catch(() => new ApiResponse("", -1, undefined));

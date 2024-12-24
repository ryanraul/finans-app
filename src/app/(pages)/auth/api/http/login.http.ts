import ApiReponse from "@/services/ApiResponse";
import UserLoginRequestDto from "../../types/UserLoginRequestDto";
import LoginResponseDto from "../../types/LoginResponseDto";
import { FinansAxiosApi } from "@/services/FinansAxiosApi";

export const getUserLoginHttp = async (
  userLoginRequest: UserLoginRequestDto
): Promise<ApiReponse<LoginResponseDto | undefined>> =>
  FinansAxiosApi.post<LoginResponseDto>("/auth/login", userLoginRequest)
    .then((response) => response)
    .catch(() => new ApiReponse("", -1, undefined));

import ApiResponse from "@/services/ApiResponse";
import UserLoginRequestDto from "../../types/UserLoginRequestDto";
import LoginResponseDto from "../../types/LoginResponseDto";
import { FinansAxiosApi } from "@/services/FinansAxiosApi";

export const getUserLoginHttp = async (
  userLoginRequest: UserLoginRequestDto
): Promise<ApiResponse<LoginResponseDto | undefined>> =>
  FinansAxiosApi.post<LoginResponseDto>("/auth/login", userLoginRequest)
    .then((response) => response)
    .catch(() => new ApiResponse("", -1, undefined));

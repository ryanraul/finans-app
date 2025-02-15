import { FinansAxiosApi } from "@/services/FinansAxiosApi";
import ApiResponse from "@/services/ApiResponse";
import IncomesRequestDto from "../IncomesRequestDto";
import IncomesResponseDto from "../IncomesResponseDto";
import CreateIncomeRequest from "../createIncomeRequest";

export const getIncomesHttp = async (
  incomesRequestDto: IncomesRequestDto
): Promise<ApiResponse<IncomesResponseDto | undefined>> =>
  FinansAxiosApi.get<IncomesResponseDto>(
    `/incomes?AccountId=${incomesRequestDto.AccountId}&Page=${incomesRequestDto.Page}&PageSize=${incomesRequestDto.PageSize}`
  )
    .then((response) => {
      return response.createInstance(IncomesResponseDto);
    })
    .catch(() => new ApiResponse("", -1, undefined));

export const postIncomeHttp = async (
  income: CreateIncomeRequest
): Promise<ApiResponse<any>> =>
  FinansAxiosApi.post<any>(`/incomes`, income)
    .then((response) => response)
    .catch(() => new ApiResponse("", -1, undefined));

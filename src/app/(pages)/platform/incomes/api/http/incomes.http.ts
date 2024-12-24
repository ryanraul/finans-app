import { FinansAxiosApi } from "@/services/FinansAxiosApi";
import ApiReponse from "@/services/ApiResponse";
import IncomesRequestDto from "../IncomesRequestDto";
import IncomesResponseDto from "../IncomesResponseDto";

export const getIncomesHttp = async (
  incomesRequestDto: IncomesRequestDto
): Promise<ApiReponse<IncomesResponseDto | undefined>> =>
  FinansAxiosApi.get<IncomesResponseDto>(
    `/incomes?AccountId=${incomesRequestDto.AccountId}&Page=${incomesRequestDto.Page}&PageSize=${incomesRequestDto.PageSize}`
  )
    .then((response) => {
      console.log(`AQUI O RESPONSE`, response);
      return response.createInstance(IncomesResponseDto);
    })
    .catch(() => new ApiReponse("", -1, undefined));

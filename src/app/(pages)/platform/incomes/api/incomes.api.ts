import IncomesRequestDto from "./IncomesRequestDto";
import { getIncomesHttp } from "./http/incomes.http";

export const getIncomes = async (accountId: number) => {
  const request = new IncomesRequestDto(3, 1, 10);
  const apiResponse = await getIncomesHttp(request);
  return apiResponse;
};

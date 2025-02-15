import Income from "../types/Income";
import IncomesRequestDto from "./IncomesRequestDto";
import CreateIncomeRequest from "./createIncomeRequest";
import DeleteIncomeRequest from "./deleteIncomeRequest";
import { getIncomesHttp, postIncomeHttp } from "./http/incomes.http";

export const getIncomes = async (accountId: number) => {
  const request = new IncomesRequestDto(3, 1, 10);
  const apiResponse = await getIncomesHttp(request);
  return apiResponse;
};

export const saveIncome = async (income: Income, accountId: number) => {
  var request = new CreateIncomeRequest(
    income.description,
    income.amount,
    income.fixed,
    income.date,
    accountId
  );

  return await postIncomeHttp(request);
};

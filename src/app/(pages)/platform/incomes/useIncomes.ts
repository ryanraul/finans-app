import { getIncomes } from "./api/incomes.api";

export const incomesByAccount = async (accountId: number) => {
  return await getIncomes(accountId);
};

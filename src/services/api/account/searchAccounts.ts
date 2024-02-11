import { fetchJson } from "@/services/api/fetchJson";
import { Account } from "@/types/account";
import { Paginated } from "@/types/pagintaion";

export const searchAccounts = async (limit = 10, skip = 0) => {
  const queryParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });
  const queryParamsString = queryParams.toString();
  const data = await fetchJson(`/api/accounts?${queryParamsString}`);
  return data as Paginated<Account>;
};

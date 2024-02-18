import { Paginated } from "@/types/pagintaion";
import { Transfer } from "@/types/transfer";
import { fetchJson } from "../fetchJson";

export const searchTransfers = async (
  accountId?: number,
  limit = 10,
  skip = 0,
  sortBy = "date",
  sortOrder = "desc",
) => {
  const queryParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    sortBy,
    sortOrder,
  });
  if (accountId) {
    queryParams.set("accountId", String(accountId));
  }

  const queryParamsString = queryParams.toString();
  const data = await fetchJson(`/api/transfers?${queryParamsString}`);
  return data as Paginated<Transfer>;
};

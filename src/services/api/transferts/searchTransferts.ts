import { Paginated } from "@/types/pagintaion";
import { Transfert } from "@/types/transfert";
import { fetchJson } from "../fetchJson";

export const searchTransferts = async (
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
  const data = await fetchJson(`/api/transferts?${queryParamsString}`);
  return data as Paginated<Transfert>;
};

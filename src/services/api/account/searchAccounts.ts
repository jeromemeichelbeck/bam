import { fetchJson } from "@/services/api/fetchJson";
import { Account } from "@/types/account";
import { Owner } from "@/types/owner";
import { Paginated } from "@/types/pagintaion";

type SearchAccountsParams = {
  limit?: number;
  skip?: number;
  q?: string;
  ownerId?: Owner["id"];
};

export const searchAccounts = async ({
  limit = 10,
  skip = 0,
  q = "",
  ownerId,
}: SearchAccountsParams) => {
  const queryParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (q) {
    queryParams.set("q", q);
  }

  if (ownerId) {
    queryParams.set("ownerId", String(ownerId));
  }

  const queryParamsString = queryParams.toString();
  const data = await fetchJson(`/api/accounts?${queryParamsString}`);
  return data as Paginated<Account>;
};

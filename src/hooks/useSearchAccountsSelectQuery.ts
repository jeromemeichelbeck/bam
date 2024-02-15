import { searchAccounts } from "@/services/api/account/searchAccounts";
import { Owner } from "@/types/owner";
import { useQuery } from "@tanstack/react-query";

export const useSearchAccountsSelectQuery = (
  q: string,
  ownerId: Owner["id"] | undefined,
) =>
  useQuery({
    queryKey: ["accounts", { q, ownerId }],
    queryFn: async () => searchAccounts({ q, ownerId }),
  });

import { searchAccounts } from "@/services/api/account/searchAccounts";
import { useQuery } from "@tanstack/react-query";

export const useSearchAccountsQuery = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: searchAccounts,
  });

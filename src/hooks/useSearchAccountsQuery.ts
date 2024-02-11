import { searchAccounts } from "@/services/api/account/searchAccounts";
import { useQuery } from "@tanstack/react-query";

export const useSearchAccountsQuery = (page = 1, size = 10) => {
  const limit = size;
  const skip = (page - 1) * size;

  return useQuery({
    queryKey: ["accounts", { page, size }],
    queryFn: async () => searchAccounts(limit, skip),
  });
};

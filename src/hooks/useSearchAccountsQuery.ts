import { searchAccounts } from "@/services/api/account/searchAccounts";
import { delayPromise } from "@/utils/helpers/delayPromise";
import { useQuery } from "@tanstack/react-query";

export const useSearchAccountsQuery = (page = 1, size = 10) => {
  const limit = size;
  const skip = (page - 1) * size;

  return useQuery({
    queryKey: ["accounts", { page, size }],
    queryFn: async () => delayPromise(searchAccounts(limit, skip)),
  });
};

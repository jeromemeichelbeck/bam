import { searchAccounts } from "@/services/api/account/searchAccounts";
import { delayPromise } from "@/utils/helpers/delayPromise";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "./usePagination";

export const useSearchAccountsQuery = (q?: string) => {
  const { page, size } = usePagination();
  const limit = size;
  const skip = (page - 1) * size;

  return useQuery({
    queryKey: ["accounts", { page, size, q }],
    queryFn: async () => delayPromise(searchAccounts({ limit, skip, q })),
  });
};

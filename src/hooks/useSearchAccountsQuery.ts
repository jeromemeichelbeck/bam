import { searchAccounts } from "@/services/api/account/searchAccounts";
import { Account, SearchAccountOptions } from "@/types/account";
import { Pagination } from "@/types/pagination";
import { SortOptions } from "@/types/search-options";
import { useQuery } from "@tanstack/react-query";

export const useSearchAccountsQuery = (
  searchOptions: SearchAccountOptions,
  query: string,
  sortOptions: SortOptions<Account>,
  pagination: Pagination,
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => searchAccounts(),
  });

  return {
    data,
    error,
    isLoading,
  };
};

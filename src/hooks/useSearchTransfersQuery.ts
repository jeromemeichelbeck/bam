import { useSort } from "@/hooks/useSort";
import { searchTransfers } from "@/services/api/transfer/searchTransfers";
import { delayPromise } from "@/utils/helpers/delayPromise";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "./usePagination";

export const useSearchTransfersQuery = (accountId?: number) => {
  const { page, size } = usePagination();
  const { sortBy, sortOrder } = useSort({ sortBy: "date", sortOrder: "desc" });
  const limit = size;
  const skip = (page - 1) * size;

  return useQuery({
    queryKey: ["transfers", { accountId, page, size, sortBy, sortOrder }],
    queryFn: async () =>
      delayPromise(searchTransfers(accountId, limit, skip, sortBy, sortOrder)),
  });
};

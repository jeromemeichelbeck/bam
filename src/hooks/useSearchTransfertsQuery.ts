import { searchTransferts } from "@/services/api/transferts/searchTransferts";
import { delayPromise } from "@/utils/helpers/delayPromise";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "./usePagination";

export const useSearchTransfertsQuery = (accountId: number) => {
  const { page, size } = usePagination();
  const limit = size;
  const skip = (page - 1) * size;

  return useQuery({
    queryKey: ["transferts", { accountId, page, size }],
    queryFn: async () => delayPromise(searchTransferts(accountId, limit, skip)),
  });
};

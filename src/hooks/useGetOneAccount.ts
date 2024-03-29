import { getOneAccount } from "@/services/api/account/getOneAccount";
import { Account } from "@/types/account";
import { delayPromise } from "@/utils/helpers/delayPromise";
import { useQuery } from "@tanstack/react-query";

export const useGetOneAccount = (accountId: Account["id"] | null) =>
  useQuery({
    queryKey: ["account", { accountId }],
    queryFn: async () => delayPromise(getOneAccount(accountId!)),
    enabled: !!accountId && !isNaN(accountId),
  });

import { getOneOnwer } from "@/services/api/owner/getOneOwner";
import { Owner } from "@/types/owner";
import { delayPromise } from "@/utils/helpers/delayPromise";
import { useQuery } from "@tanstack/react-query";

export const useGetOneOwner = (ownerId: Owner["id"] | null) =>
  useQuery({
    queryKey: ["owner", { ownerId }],
    queryFn: async () => delayPromise(getOneOnwer(ownerId!)),
    enabled: !!ownerId && !isNaN(ownerId),
  });

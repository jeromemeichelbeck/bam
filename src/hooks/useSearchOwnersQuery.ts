import { searchOwners } from "@/services/api/owner/searchOwners";
import { useQuery } from "@tanstack/react-query";

export const useSearchOwnersQuery = () =>
  useQuery({
    queryKey: ["owners"],
    queryFn: searchOwners,
  });

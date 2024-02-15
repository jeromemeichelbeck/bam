import { searchOwners } from "@/services/api/owner/searchOwners";
import { useQuery } from "@tanstack/react-query";

export const useSearchOwnersSelectQuery = (q?: string) =>
  useQuery({
    queryKey: ["owners", { q }],
    queryFn: async () => searchOwners({ q }),
  });

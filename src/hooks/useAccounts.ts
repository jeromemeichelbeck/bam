import { searchAccounts } from "@/api/account/searchAccounts";
import { useQuery } from "@tanstack/react-query";

export const useAccounts = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: searchAccounts,
  });

import { fetchJson } from "@/services/api/fetchJson";
import { Account } from "@/types/account";

export const searchAccounts = async () => {
  const data = await fetchJson("/api/accounts");
  return data as Account[];
};

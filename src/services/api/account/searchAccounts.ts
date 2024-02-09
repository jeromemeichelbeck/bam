import { Account } from "@/types/account";
import { PaginatedData } from "@/types/pagination";

export const searchAccounts = async () => {
  const response = await fetch("/api/accounts");
  const data = await response.json();
  return data as PaginatedData<Account>;
};

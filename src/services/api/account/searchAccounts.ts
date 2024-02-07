import { Account } from "@/types/account";

export const searchAccounts = async () => {
  const response = await fetch("/api/accounts");
  const data = await response.json();
  return data as Account[];
};

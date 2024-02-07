import { Account } from "@/types/account";
import { getAllAccounts } from "./getAllAccounts";

export const getOneAccountById = async (accountId: Account["id"]) => {
  const accounts = await getAllAccounts();

  return accounts.find((account) => account.id === accountId) || null;
};

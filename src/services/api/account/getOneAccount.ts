import { Account } from "@/types/account";
import { fetchJson } from "../fetchJson";

export const getOneAccount = async (accountId: Account["id"]) => {
  const data = await fetchJson(`/api/accounts/${accountId}`);
  return data as Account;
};

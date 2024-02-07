import { Account } from "@/types/account";
import { saveEntities } from "../shared/saveEntities";
import { getAllAccounts } from "./getAllAccounts";

export const addAccount = async (account: Omit<Account, "id">) => {
  const accounts = await getAllAccounts();

  const id = accounts.length < 1 ? 1 : accounts[accounts.length - 1].id + 1;

  accounts.push({ ...account, id });

  await saveEntities(accounts, "accounts");

  return { ...account, id };
};

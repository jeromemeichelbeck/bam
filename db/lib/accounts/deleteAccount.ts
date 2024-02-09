import { Account } from "@/types/account";
import { saveEntities } from "../shared/saveEntities";
import { getAllAccounts } from "./getAllAccounts";

export const deleteAccount = async (id: Account["id"]) => {
  const accounts = await getAllAccounts();

  const index = accounts.findIndex((account) => account.id === id);

  if (index === -1) {
    return null;
  }

  accounts.splice(index, 1);

  await saveEntities(accounts, "accounts");

  return id;
};

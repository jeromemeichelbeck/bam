import { Account } from "@/types/account";
import { cleanObject } from "@/utils//helpers/cleanObject";
import { saveEntities } from "../shared/saveEntities";
import { getAllAccounts } from "./getAllAccounts";

export const updateAccount = async (
  accountId: Account["id"],
  updates: Partial<Pick<Account, "name">>,
) => {
  const accounts = await getAllAccounts();
  const index = accounts.findIndex((account) => account.id === accountId);

  if (index === -1) {
    // No account to modify, should not happen
    return null;
  }

  const updatedAccount = { ...accounts[index], ...cleanObject(updates) };

  accounts.splice(index, 1, updatedAccount);

  await saveEntities(accounts, "accounts");

  return updatedAccount;
};

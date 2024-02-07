import { Account } from "@/types/account";
import { SearchOptions, searchEntities } from "../shared/searchEntities";
import { getAllAccounts } from "./getAllAccounts";

export const searchAccounts = async (searchOptions: SearchOptions<Account>) => {
  console.log({ searchOptions });
  const accounts = await getAllAccounts();

  return searchEntities(accounts, searchOptions);
};

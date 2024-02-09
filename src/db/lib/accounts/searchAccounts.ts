import { Account, SearchAccountOptions } from "@/types/account";
import { Owner } from "@/types/owner";
import { LimitOptions, SortOptions } from "@/types/search-options";
import { getAllOwners } from "../owners/getAllOwners";
import { sortAndLimit } from "../shared/sortAndLimit";
import { getAllAccounts } from "./getAllAccounts";

export const searchAccounts = async (
  searchOptions: SearchAccountOptions,
  query?: string,
  sortOption?: SortOptions<Account>,
  limitOptions?: LimitOptions,
) => {
  const accounts = await getAllAccounts();
  let ownerIds = [] as Owner["id"][];

  if (query) {
    ownerIds = (await getAllOwners())
      .filter((owner) => owner.name.toLowerCase().includes(query.toLowerCase()))
      .map((owner) => owner.id);
  }

  const filteredAccounts = accounts.filter((account) => {
    for (const [key, value] of Object.entries(searchOptions)) {
      if (value && account[key as keyof Account] != value) {
        return false;
      }
    }

    if (query) {
      if (
        !ownerIds.includes(account.ownerId) &&
        !account.name.toLowerCase().includes(query.toLowerCase())
      ) {
        return false;
      }
    }

    return true;
  });

  return {
    data: sortAndLimit(filteredAccounts, sortOption, limitOptions),
    total: filteredAccounts.length,
  };
};

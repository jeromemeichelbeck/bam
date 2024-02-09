import { Account, SearchAccountOptions } from "@/types/account";
import { SortOptions } from "@/types/search-options";
import { NextApiRequest } from "next";

export const SEARCH_ACCOUNT_OPTIONS = [
  "name",
  "ownerId",
  "currency",
] as const satisfies (keyof Account)[];

export const getSearchAccountOptions = (query: NextApiRequest["query"]) => {
  return SEARCH_ACCOUNT_OPTIONS.reduce(
    <T extends keyof SearchAccountOptions>(
      acc: SearchAccountOptions,
      key: T,
    ) => {
      const valueToMatch = query[key] as Account[T];
      if (valueToMatch && !Array.isArray(valueToMatch)) {
        acc[key] = valueToMatch;
      }
      return acc;
    },
    {} as SearchAccountOptions,
  );
};

const accountSortableFields = [
  "id",
  "name",
  "balance",
] as const satisfies (keyof Account)[];

export const getSortAccountOptions = (query: NextApiRequest["query"]) => {
  if (
    query.sortBy &&
    !Array.isArray(query.sortBy) &&
    accountSortableFields.includes(
      query.sortBy as (typeof accountSortableFields)[number],
    )
  ) {
    return {
      sortBy: query.sortBy as (typeof accountSortableFields)[number],
      sortOrder: (query.sortOrder === "desc"
        ? "desc"
        : "asc") as SortOptions<Account>["sortOrder"],
    };
  }
};

export const getLimitAccountOptions = (query: NextApiRequest["query"]) => {
  if (
    query.limit &&
    !Array.isArray(query.limit) &&
    !isNaN(parseInt(query.limit, 10))
  ) {
    return {
      limit: parseInt(query.limit, 10),
      skip:
        query.skip && !Array.isArray(query.skip) ? parseInt(query.skip, 10) : 0,
    };
  }
};

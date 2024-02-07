import { DEFAULT_LIMIT, DEFAULT_SKIP } from "@/constants/pagination";
import { NextApiRequest } from "next";
import { SortOrder } from "./searchEntities";

export const getSearchOptionsFromQuery = <T extends Record<string, unknown>>(
  query: NextApiRequest["query"],
) => {
  // We won't do any validation here, as it is not the scope of the project
  return {
    limit: Number(query.limit) || DEFAULT_LIMIT,
    skip: Number(query.skip) || DEFAULT_SKIP,
    sortBy: query.sortBy as keyof T,
    sortOrder: (query.sortOrder as SortOrder) || "asc",
    ...query,
  };
};

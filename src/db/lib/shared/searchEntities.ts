import { DEFAULT_LIMIT, DEFAULT_SKIP } from "@/constants/pagination";

export type SortOrder = "asc" | "desc";

export type SearchOptions<T extends Record<string, unknown>> = Partial<
  Omit<T, "id">
> & {
  limit?: number;
  skip?: number;
  sortBy?: keyof T;
  sortOrder?: SortOrder;
};

export const searchEntities = <T extends Record<string, unknown>>(
  entities: T[],
  searchOptions: SearchOptions<T>,
): T[] => {
  const {
    limit = DEFAULT_LIMIT,
    skip = DEFAULT_SKIP,
    sortBy,
    sortOrder,
    ...query
  } = searchOptions;

  console.log({ query });

  const filteredEntities = entities.filter((entity) => {
    // Filter
    return Object.entries(query).every(([key, value]) => {
      // Do not search this key
      if (typeof value === "undefined") {
        return true;
      }

      // Value is an array
      if (Array.isArray(value)) {
        return value.includes(entity[key]);
      }

      // Loose equality to check number against string
      // We would not do that an a real production API
      return entity[key] == value;
    });
  });

  // Sort
  if (sortBy) {
    filteredEntities.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }

      return a[sortBy] < b[sortBy] ? 1 : -1;
    });
  }

  return filteredEntities.slice(skip, skip + limit);
};

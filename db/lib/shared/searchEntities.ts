import { DEFAULT_LIMIT, DEFAULT_SKIP } from "@/constants/pagination";

export type SortOrder = "asc" | "desc";

export type SearchOptions<T extends Record<string, unknown>> = Partial<
  Omit<T, "id">
> & {
  limit?: number;
  skip?: number;
  sortBy?: keyof T;
  sortOrder?: SortOrder;
  q: string;
};

export const searchEntities = <
  T extends Record<string, string | number | boolean>,
>(
  entities: T[],
  searchOptions: SearchOptions<T>,
): T[] => {
  const {
    limit = DEFAULT_LIMIT,
    skip = DEFAULT_SKIP,
    sortBy,
    sortOrder,
    q,
    ...query
  } = searchOptions;

  let filteredEntities = entities;

  // Search by q parameter
  if (q) {
    const search = q.toLowerCase();

    filteredEntities = entities.filter((entity) => {
      return Object.values(entity).some((value) => {
        return value.toString().toLowerCase().includes(search);
      });
    });
  }

  // Filter by each exact query parameter
  filteredEntities = filteredEntities.filter((entity) => {
    return Object.entries(query).every(([key, value]) => {
      // Do not search this key if its value is undefined
      if (typeof value === "undefined") {
        return true;
      }

      // Value is an array
      if (Array.isArray(value)) {
        return value.includes(entity[key]);
      }
      return entity[key].toString() == value.toString();
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

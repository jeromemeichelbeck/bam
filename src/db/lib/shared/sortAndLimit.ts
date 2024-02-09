import { DEFAULT_LIMIT, DEFAULT_SKIP } from "@/constants/pagination";
import { LimitOptions, SortOptions } from "@/types/search-options";

export const sortAndLimit = <TEntity extends { id: number }>(
  entities: TEntity[],
  sortOptions: SortOptions<TEntity> = { sortBy: "id", sortOrder: "asc" },
  limitOptions: LimitOptions = { limit: DEFAULT_LIMIT, skip: DEFAULT_SKIP },
) => {
  const { sortBy, sortOrder } = sortOptions;
  const { limit, skip } = limitOptions;

  const sortedEntities = [...entities].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return sortedEntities.slice(skip, skip + limit);
};

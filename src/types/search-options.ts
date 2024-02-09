export type LimitOptions = {
  limit: number;
  skip: number;
};

export type SortOptions<TEntity> = {
  sortBy: keyof TEntity;
  sortOrder: "asc" | "desc";
};

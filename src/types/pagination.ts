export type PaginatedData<TData> = {
  data: TData[];
  total: number;
};

export type Pagination = {
  page: number;
  perPage: number;
};

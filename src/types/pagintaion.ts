export type Paginated<T extends Record<string, unknown>> = {
  data: T[];
  count: number;
};

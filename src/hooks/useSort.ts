import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export type SortOptions<
  TEntity extends { id: number } & Record<string, unknown>,
> = {
  sortBy: keyof TEntity;
  sortOrder: "asc" | "desc";
};

export const useSort = <
  TEntity extends { id: number } & Record<string, unknown>,
>({
  sortBy = "id",
  sortOrder = "desc",
}: SortOptions<TEntity>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  sortBy = searchParams.get("sortBy") || sortBy;
  sortOrder =
    (searchParams.get("sortOrder") as SortOptions<TEntity>["sortOrder"]) ||
    sortOrder;

  const setSortParams = (sortBy: string, sortOrder: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    router.push(`${pathname}?${params}`);
  };

  return {
    sortBy,
    sortOrder,
    setSortParams,
  };
};

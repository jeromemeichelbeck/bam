import { DEFAULT_PAGE, DEFAULT_SIZE } from "@/constants/pagination";
import { PaginationQueryParams } from "@/types/pagintaion";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const usePagination = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || DEFAULT_PAGE);
  const size = parseInt(searchParams.get("size") || DEFAULT_SIZE);

  const setPaginationParams = useCallback(
    (queryParams: PaginationQueryParams) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string") {
          params.set(key, value);
        }
      }

      router.push(`${pathname}?${params}`);
    },
    [router, pathname, searchParams],
  );

  return {
    page,
    size,
    setPaginationParams,
  };
};

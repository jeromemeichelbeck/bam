import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useQ = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q");

  const setQ = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", q.toString());
      router.push(`${pathname}?${params}`);
    },
    [router, pathname, searchParams],
  );

  return {
    q,
    setQ,
  };
};

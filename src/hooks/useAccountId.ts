import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useAccountId = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const accountId = Number(searchParams.get("accountId"));

  const setAccountId = useCallback(
    (accountId: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("accountId", accountId.toString());
      router.push(`${pathname}?${params}`);
    },
    [router, pathname, searchParams],
  );

  return {
    accountId: isNaN(accountId) || !accountId ? undefined : accountId,
    setAccountId,
  };
};

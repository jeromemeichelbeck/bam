import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useOwnerId = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const ownerId = Number(searchParams.get("ownerId"));

  const setOwnerId = useCallback(
    (ownerId: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("ownerId", ownerId.toString());
      router.push(`${pathname}?${params}`);
    },
    [router, pathname, searchParams],
  );

  return {
    ownerId: isNaN(ownerId) || !ownerId ? undefined : ownerId,
    setOwnerId,
  };
};

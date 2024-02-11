import { fetchJson } from "@/services/api/fetchJson";
import { Owner } from "@/types/owner";

export const searchOwners = async (q?: string) => {
  let queryParamsString = "";
  if (q) {
    const queryParams = new URLSearchParams({ q });
    queryParamsString = `?${queryParams.toString()}`;
  }

  const data = await fetchJson(`/api/owners${queryParamsString}`);
  return data as Owner[];
};

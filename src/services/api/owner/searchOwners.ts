import { fetchJson } from "@/services/api/fetchJson";
import { Owner } from "@/types/owner";

export const searchOwners = async () => {
  const data = await fetchJson("/api/owners");
  return data as Owner[];
};

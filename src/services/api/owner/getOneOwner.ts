import { fetchJson } from "@/services/api/fetchJson";
import { Owner } from "@/types/owner";

export const getOneOnwer = async (ownerId: Owner["id"]) => {
  const data = await fetchJson(`/api/owners/${ownerId}`);
  return data as Owner;
};

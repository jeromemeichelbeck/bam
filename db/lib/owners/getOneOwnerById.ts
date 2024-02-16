import { Owner } from "@/types/owner";
import { getAllOwners } from "./getAllOwners";

export const getOneOwnerById = async (ownerId: Owner["id"]) => {
  const owners = await getAllOwners();

  return owners.find((owner) => owner.id === ownerId) || null;
};

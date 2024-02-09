import { getAllOwners } from "./getAllOwners";

export const searchOwnersByName = async (name: string) => {
  const owners = await getAllOwners();

  return owners.filter((owner) =>
    owner.name.toLowerCase().includes(name.toLowerCase()),
  );
};

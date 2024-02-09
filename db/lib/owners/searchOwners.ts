import { Owner } from "@/types/owner";
import { SearchOptions, searchEntities } from "../shared/searchEntities";
import { getAllOwners } from "./getAllOwners";

export const searchOwners = async (searchOptions: SearchOptions<Owner>) => {
  const owners = await getAllOwners();

  return searchEntities(owners, searchOptions);
};

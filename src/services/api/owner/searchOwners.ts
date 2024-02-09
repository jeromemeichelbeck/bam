import { Owner } from "@/types/owner";

export const searchOwners = async () => {
  const response = await fetch("/api/owners");
  const data = await response.json();
  return data as Owner[];
};

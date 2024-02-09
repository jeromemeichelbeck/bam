import { Owner } from "@/types/owner";

export const getAllOwners = async () => {
  try {
    const ownersFile = await import("../../data/owners.json", {
      with: { type: "json" },
    });

    return ownersFile.default as Owner[];
  } catch (error) {
    return [] as Owner[];
  }
};

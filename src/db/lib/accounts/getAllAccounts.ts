import { Account } from "@/types/account";

export const getAllAccounts = async () => {
  try {
    const accountsFile = await import("../../data/accounts.json", {
      with: { type: "json" },
    });

    return accountsFile.default as Account[];
  } catch (error) {
    return [] as Account[];
  }
};

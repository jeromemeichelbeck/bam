import { AccountFormDTO } from "@/schemas/account";

export const addAccount = async (accountFormData: AccountFormDTO) => {
  const newAccount = await fetch("/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountFormData),
  });
};

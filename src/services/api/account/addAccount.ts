import { AccountFormDTO } from "@/schemas/account";
import { fetchJson } from "@/services/api/fetchJson";

export const addAccount = async (accountFormData: AccountFormDTO) => {
  await fetchJson("/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountFormData),
  });
};

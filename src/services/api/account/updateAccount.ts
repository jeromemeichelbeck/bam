import { UpdateAccountFormDTO } from "@/schemas/account";
import { fetchJson } from "@/services/api/fetchJson";

export const updateAccount = async ({ id, name }: UpdateAccountFormDTO) => {
  await fetchJson(`/api/accounts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
};

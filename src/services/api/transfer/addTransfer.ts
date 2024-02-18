import { TransferFormDTO } from "@/schemas/transfer";
import { fetchJson } from "../fetchJson";

export const addTransfer = async (transferFormData: TransferFormDTO) => {
  await fetchJson("/api/transfers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transferFormData),
  });
};

import { TransfertFormDTO } from "@/schemas/transfert";
import { fetchJson } from "../fetchJson";

export const addTransfert = async (transfertFormData: TransfertFormDTO) => {
  await fetchJson("/api/transferts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transfertFormData),
  });
};

import { Transfert } from "@/types/transfert";
import { saveEntities } from "../shared/saveEntities";
import { getAllTransferts } from "./getAllTranferts";

export const addTransfert = async (transfert: Omit<Transfert, "id">) => {
  const transferts = await getAllTransferts();

  const id =
    transferts.length < 1 ? 1 : transferts[transferts.length - 1].id + 1;

  transferts.push({ ...transfert, id });

  await saveEntities(transferts, "transferts");

  return { ...transfert, id };
};

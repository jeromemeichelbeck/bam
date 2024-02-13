import { Transfert } from "@/types/transfert";
import { SearchOptions, searchEntities } from "../shared/searchEntities";
import { getAllTransferts } from "./getAllTranferts";

type TransfertSearchOptions = SearchOptions<Transfert> & {
  accountId?: number;
};

export const searchTransferts = async ({
  accountId,
  ...searchOptions
}: TransfertSearchOptions) => {
  let transferts = await getAllTransferts();

  // Filter by accountId
  if (accountId) {
    transferts = transferts.filter(
      (transfert) =>
        transfert.fromAccountId.toString() === accountId.toString() ||
        transfert.toAccountId.toString() === accountId.toString(),
    );
  }

  return searchEntities(transferts, searchOptions);
};

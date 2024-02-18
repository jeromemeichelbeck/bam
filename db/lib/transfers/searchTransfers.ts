import { Transfer } from "@/types/transfer";
import { SearchOptions, searchEntities } from "../shared/searchEntities";
import { getAllTransfers } from "./getAllTranfert";

type TransferSearchOptions = SearchOptions<Transfer> & {
  accountId?: number;
};

export const searchTransfers = async ({
  accountId,
  ...searchOptions
}: TransferSearchOptions) => {
  let transfers = await getAllTransfers();

  // Filter by accountId
  if (accountId) {
    transfers = transfers.filter(
      (transfer) =>
        transfer.fromAccountId.toString() === accountId.toString() ||
        transfer.toAccountId.toString() === accountId.toString(),
    );
  }

  return searchEntities(transfers, searchOptions);
};

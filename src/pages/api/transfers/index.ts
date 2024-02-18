import { Maybe } from "@/types/api-error";
import { Paginated } from "@/types/pagintaion";
import { Transfer } from "@/types/transfer";
import { NextApiRequest, NextApiResponse } from "next";
import { getSearchOptionsFromQuery } from "../../../../db/lib/shared/getSearchOptionsFromQuery";
import { addTransfer } from "../../../../db/lib/transfers/addTransfer";
import { searchTransfers } from "../../../../db/lib/transfers/searchTransfers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maybe<Paginated<Transfer> | Transfer>>,
) {
  switch (req.method) {
    case "GET":
      const searchOptions = getSearchOptionsFromQuery<Transfer>(req.query);
      try {
        const transfers = await searchTransfers(searchOptions);
        return res.status(200).json(transfers);
      } catch (error) {}
    case "POST":
      const { fromAccountId, toAccountId, amount, description } = req.body;

      // Create the transfer
      try {
        const newTransfer = await addTransfer({
          fromAccountId,
          toAccountId,
          amount,
          description,
        });
        return res.status(201).json(newTransfer);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the transfer",
        });
      }

    default:
      return res.status(405).end();
  }
}

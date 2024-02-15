import { Maybe } from "@/types/api-error";
import { Paginated } from "@/types/pagintaion";
import { Transfert } from "@/types/transfert";
import { NextApiRequest, NextApiResponse } from "next";
import { getSearchOptionsFromQuery } from "../../../../db/lib/shared/getSearchOptionsFromQuery";
import { addTransfert } from "../../../../db/lib/transferts/addTransfert";
import { searchTransferts } from "../../../../db/lib/transferts/searchTransferts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maybe<Paginated<Transfert> | Transfert>>,
) {
  switch (req.method) {
    case "GET":
      const searchOptions = getSearchOptionsFromQuery<Transfert>(req.query);
      try {
        const transferts = await searchTransferts(searchOptions);
        return res.status(200).json(transferts);
      } catch (error) {}
    case "POST":
      const { fromAccountId, toAccountId, amount, description } = req.body;

      // Create the transfert
      try {
        const newTransfert = await addTransfert({
          fromAccountId,
          toAccountId,
          amount,
          description,
        });
        return res.status(201).json(newTransfert);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the transfert",
        });
      }

    default:
      return res.status(405).end();
  }
}

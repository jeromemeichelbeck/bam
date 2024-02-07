import { searchAccounts } from "@/db/lib/accounts/searchAccounts";
import { getSearchOptionsFromQuery } from "@/db/lib/shared/getSearchOptionsFromQuery";
import { Account } from "@/types/account";
import { Maybe } from "@/types/api-error";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maybe<Account[]>>,
) {
  switch (req.method) {
    case "GET":
      const searchOptions = getSearchOptionsFromQuery<Account>(req.query);
      try {
        const accounts = await searchAccounts(searchOptions);
        return res.status(200).json(accounts);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching the accounts",
        });
      }
    case "POST":

    default:
      return res.status(405).end();
  }
}

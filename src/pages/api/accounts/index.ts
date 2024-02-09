import { addAccount } from "@/db/lib/accounts/addAccount";
import {
  getLimitAccountOptions,
  getSearchAccountOptions,
  getSortAccountOptions,
} from "@/db/lib/accounts/getSearchAccountOptions";
import { searchAccounts } from "@/db/lib/accounts/searchAccounts";
import { Account } from "@/types/account";
import { Maybe } from "@/types/api-error";
import { PaginatedData } from "@/types/pagination";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maybe<PaginatedData<Account> | Account>>,
) {
  switch (req.method) {
    case "GET":
      const searchOptions = getSearchAccountOptions(req.query);
      const sortOptions = getSortAccountOptions(req.query);
      const limitOptions = getLimitAccountOptions(req.query);
      try {
        const paginatedAccounts = await searchAccounts(
          searchOptions,
          req.query.q as string,
          sortOptions,
          limitOptions,
        );
        return res.status(200).json(paginatedAccounts);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching the accounts",
        });
      }
    case "POST":
      // We do not vzlidzte input here, as it is not the scope of the project
      const { ownerId, name, currency, balance } = req.body;

      // Search for an account with the same name and owner
      const existingAccount = await searchAccounts({ ownerId, name });
      if (existingAccount && existingAccount.total > 0) {
        return res.status(409).json({
          code: "CONFLICT",
          message: `An account with the name '${name}' already exists for owner with id '${ownerId}'`,
        });
      }

      // Create the account
      try {
        const newAccount = await addAccount({
          ownerId,
          name,
          currency,
          balance,
        });
        return res.status(201).json(newAccount);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the account",
        });
      }

    default:
      return res.status(405).end();
  }
}

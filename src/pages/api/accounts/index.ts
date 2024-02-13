import { Account } from "@/types/account";
import { Maybe } from "@/types/api-error";
import { Paginated } from "@/types/pagintaion";
import type { NextApiRequest, NextApiResponse } from "next";
import { addAccount } from "../../../../db/lib/accounts/addAccount";
import { searchAccounts } from "../../../../db/lib/accounts/searchAccounts";
import { getSearchOptionsFromQuery } from "../../../../db/lib/shared/getSearchOptionsFromQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maybe<Paginated<Account> | Account>>,
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
      // We do not validate input here, as it is not the scope of the project
      const { ownerId, name, currency, balance } = req.body;

      // Search for an account with the same name and owner
      const existingAccount = await searchAccounts({ ownerId, name });
      if (existingAccount && existingAccount.count > 0) {
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
        // Simply log the error for this example
        console.log({ error });
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the account",
        });
      }

    default:
      return res.status(405).end();
  }
}

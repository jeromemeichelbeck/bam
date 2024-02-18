import { Account } from "@/types/account";
import { Maybe } from "@/types/api-error";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteAccount } from "../../../../db/lib/accounts/deleteAccount";
import { getOneAccountById } from "../../../../db/lib/accounts/getOneAccountById";
import { searchAccounts } from "../../../../db/lib/accounts/searchAccounts";
import { updateAccount } from "../../../../db/lib/accounts/updateAccount";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maybe<Account>>,
) {
  // For any method we should get an accountId
  if (
    !req.query.accountId ||
    Array.isArray(req.query.accountId) ||
    isNaN(parseInt(req.query.accountId))
  ) {
    return res.status(400).json({
      code: "BAD_REQUEST",
      message: "'accountId' is required and must be a valid integer",
    });
  }

  const accountId = parseInt(req.query.accountId);

  switch (req.method) {
    case "GET":
      try {
        const account = await getOneAccountById(accountId);
        if (!account) {
          return res.status(404).json({
            code: "NOT_FOUND",
            message: "Account not found",
          });
        }
        return res.status(200).json(account);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching the account",
        });
      }

    case "PATCH":
      const account = await getOneAccountById(accountId);
      if (!account) {
        return res.status(404).json({
          code: "NOT_FOUND",
          message: "Account not found",
        });
      }

      const { name } = req.body;

      if (name) {
        // Search by name
        const existingAccountWithSameName = await searchAccounts({
          name,
          ownerId: account.ownerId,
        });
        if (
          existingAccountWithSameName &&
          existingAccountWithSameName.count > 0 &&
          existingAccountWithSameName.data[0].id !== accountId
        ) {
          return res.status(409).json({
            code: "CONFLICT",
            message: `An account with the name '${name}' already exists for owner with id '${account.ownerId}'`,
          });
        }
      }

      // Finally, update the account
      try {
        const updatedAccount = await updateAccount(accountId, {
          name,
        });
        if (!updatedAccount) {
          // Should not happen
          return res.status(404).json({
            code: "NOT_FOUND",
            message: "Account not found",
          });
        }
        return res.status(200).json(updatedAccount);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating the account",
        });
      }

    case "DELETE":
      const accountToDelete = await getOneAccountById(accountId);
      if (!accountToDelete) {
        return res.status(404).json({
          code: "NOT_FOUND",
          message: "Account not found",
        });
      }

      // Delete the account
      try {
        const id = await deleteAccount(accountId);
        if (!id) {
          // Should not happen
          return res.status(404).json({
            code: "NOT_FOUND",
            message: "Account not found",
          });
        }
        return res.status(204).end();
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while deleting the account",
        });
      }

    default:
      return res.status(405).end();
  }
}

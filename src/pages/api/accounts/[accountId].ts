import { getOneAccountById } from "@/db/lib/accounts/getOneAccountById";
import { Account } from "@/types/account";
import { Maybe } from "@/types/api-error";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maybe<Account>>,
) {
  switch (req.method) {
    case "GET":
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

      try {
        const account = await getOneAccountById(parseInt(req.query.accountId));
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

    default:
      return res.status(405).end();
  }
}

import { Maybe } from "@/types/api-error";
import { Owner } from "@/types/owner";
import { NextApiRequest, NextApiResponse } from "next";
import { getOneOwnerById } from "../../../../db/lib/owners/getOneOwnerById";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maybe<Owner>>,
) {
  if (
    !req.query.ownerId ||
    Array.isArray(req.query.ownerId) ||
    isNaN(parseInt(req.query.ownerId))
  ) {
    return res.status(400).json({
      code: "BAD_REQUEST",
      message: "'ownerId' is required and must be a valid integer",
    });
  }

  const ownerId = parseInt(req.query.ownerId);

  switch (req.method) {
    case "GET":
      try {
        const owner = await getOneOwnerById(ownerId);
        if (!owner) {
          return res.status(404).json({
            code: "NOT_FOUND",
            message: "Owner not found",
          });
        }
        return res.status(200).json(owner);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching the owner",
        });
      }

    default:
      return res.status(405).end();
  }
}

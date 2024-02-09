import { Owner } from "@/types/owner";
import { NextApiRequest, NextApiResponse } from "next";
import { searchOwners } from "../../../../db/lib/owners/searchOwners";
import { getSearchOptionsFromQuery } from "../../../../db/lib/shared/getSearchOptionsFromQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const searchOptions = getSearchOptionsFromQuery<Owner>(req.query);
      try {
        const owners = await searchOwners(searchOptions);
        return res.status(200).json(owners);
      } catch (error) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching the owners",
        });
      }
    default:
      return res.status(405).end();
  }
}

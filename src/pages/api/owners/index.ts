import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":

    case "POST":
      return res.status(200).json({ message: "POST not implemented" });
    default:
      return res.status(405).end();
  }
}

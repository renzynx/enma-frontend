import { NextApiRequest, NextApiResponse } from "next";
import ytsr from "ytsr";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  if (query) {
    const results = await await ytsr(query as string, { limit: 9 });
    return res.send(results.items);
  } else {
    return res.status(400).send("Bad Request");
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const BOOK_ADDRESS = process.env.BOOK_SERVICE_ADDRESS!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query;

  try {
    const queryString = new URLSearchParams(
      req.query as Record<string, string>
    );
    queryString.delete("id");

    const requestQueryString = queryString.toString();
    const url = `${BOOK_ADDRESS}/api/subject/${id}${
      requestQueryString ? `?${requestQueryString}` : ""
    }`;

    const response = await axios.get(url);

    return res.status(200).json(response.data);
  } catch (err) {
    console.error("[SUBJECT DETAILS ERROR]", err);
    return res
      .status(404)
      .json({ error: "Failed to find any books using subject id" });
  }
}

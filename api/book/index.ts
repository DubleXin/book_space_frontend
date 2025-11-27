import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const BOOK_ADDRESS = process.env.BOOK_SERVICE_ADDRESS!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const queryString = new URLSearchParams(
      req.query as Record<string, string>
    ).toString();

    const response = await axios.get(
      `${BOOK_ADDRESS}/api/book${queryString ? `?${queryString}` : ""}`
    );

    return res.status(200).json(response.data);
  } catch (e) {
    console.error("[BOOKS ERROR]", e);
    return res.status(500).json({ error: "Failed to load books" });
  }
}

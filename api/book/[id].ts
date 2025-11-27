import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const BOOK_ADDRESS = process.env.BOOK_SERVICE_ADDRESS!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query;

  try {
    const response = await axios.get(`${BOOK_ADDRESS}/api/book/${id}`);

    return res.status(200).json(response.data);
  } catch (e) {
    console.error("[BOOK DETAILS ERROR]", e);
    return res.status(404).json({ error: "Book not found" });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS!;
const BOOK_PORT = process.env.BOOK_SERVICE_PORT!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const response = await axios.get(
      `${BACKEND_ADDRESS}:${BOOK_PORT}/api/book/${id}`
    );

    return res.status(200).json(response.data);
  } catch (e) {
    console.error("[BOOK DETAILS ERROR]", e);
    return res.status(404).json({ error: "Book not found" });
  }
}

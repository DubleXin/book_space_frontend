import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS!;
const BOOK_PORT = process.env.BOOK_SERVICE_PORT!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const queryString = new URLSearchParams(
      req.query as Record<string, string>
    ).toString();

    const response = await axios.get(
      `${BACKEND_ADDRESS}:${BOOK_PORT}/api/book${
        queryString ? `?${queryString}` : ""
      }`
    );

    return res.status(200).json(response.data);
  } catch (e) {
    console.error("[BOOKS ERROR]", e);
    return res.status(500).json({ error: "Failed to load books" });
  }
}

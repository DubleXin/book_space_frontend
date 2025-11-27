import axios, { AxiosError } from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const PROFILE_ADDRESS = process.env.PROFILE_SERVICE_ADDRESS!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const response = await axios.get(
      `${PROFILE_ADDRESS}/api/review/book/${id}`
    );

    return res.status(200).json(response.data);
  } catch (err) {
    const error = err as AxiosError;

    const status = error.response?.status ?? 500;
    const data = error.response?.data ?? { error: "Server error" };

    console.error("[REVIEWS BY BOOK ERROR]", error.response?.status, data);

    return res.status(status).json(data);
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios, { AxiosError } from "axios";

const RECOMMENDATION_ADDRESS = process.env.RECOMMENDATION_SERVICE_ADDRESS!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Missing Authorization" });

  try {
    const response = await axios.get(
      `${RECOMMENDATION_ADDRESS}/api/recommendation`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (err) {
    const error = err as AxiosError;

    const status = error.response?.status ?? 500;
    const data = error.response?.data ?? { error: "Server error" };

    console.error(
      "[ENHANCED RECOMMENDATION ERROR]",
      error.response?.status,
      data
    );

    return res.status(status).json(data);
  }
}

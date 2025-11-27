import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios, { AxiosError } from "axios";

const PROFILE_ADDRESS = process.env.PROFILE_SERVICE_ADDRESS!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Missing Authorization" });

  try {
    const url = `${PROFILE_ADDRESS}/api/profile/me`;

    if (req.method === "GET") {
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      return res.status(200).json(response.data);
    }

    if (req.method === "PUT") {
      const response = await axios.put(url, req.body, {
        headers: { Authorization: token },
      });
      return res.status(200).json(response.data);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    const error = err as AxiosError;

    const status = error.response?.status ?? 500;
    const data = error.response?.data ?? { error: "Server error" };

    console.error("[PROFILE ERROR]", error.response?.status, data);

    return res.status(status).json(data);
  }
}

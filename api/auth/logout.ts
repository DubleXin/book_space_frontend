import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS!;
const AUTH_PORT = process.env.AUTH_SERVICE_PORT!;

type LogoutResponse = {
  success: boolean;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh token" });
  }

  try {
    const response = await axios.post<LogoutResponse>(
      `${BACKEND_ADDRESS}:${AUTH_PORT}/api/auth/logout`,
      { token: refreshToken }
    );

    if (!response.data.success) {
      throw new Error("[LOGOUT] Backend bad response");
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error("[LOGOUT ERROR]", e);
    return res.status(500).json({
      error: "Failed to logout",
    });
  }
}

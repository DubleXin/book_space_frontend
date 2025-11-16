import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS!;
const AUTH_PORT = process.env.AUTH_SERVICE_PORT!;

type RefreshResponse = {
  success: boolean;
  token: string;
};

type TokenPayload = {
  sub: number;
  email: string;
  exp: number;
  iat: number;
};
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Missing refresh token" });
  }

  try {
    const response = await axios.post<RefreshResponse>(
      `${BACKEND_ADDRESS}:${AUTH_PORT}/api/auth/refresh`,
      { token: refreshToken }
    );
    if (!response.data.success) {
      throw new Error("[REFRESH] Backend bad response");
    }

    const data = response.data;
    const user = jwtDecode<TokenPayload>(data.token);

    return res.status(200).json({
      accessToken: data.token,
      refreshToken: refreshToken,
      user,
    });
  } catch (e) {
    console.error("[REFRESH ERROR]", e);

    return res.status(401).json({
      error: "Invalid credentials",
    });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AUTH_ADDRESS = process.env.AUTH_SERVICE_ADDRESS!;

type LoginResponse = {
  success: boolean;
  token: string;
  refreshToken: string;
};

type TokenPayload = {
  sub: number;
  email: string;
  exp: number;
  iat: number;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const response = await axios.post<LoginResponse>(
      `${AUTH_ADDRESS}/api/auth/login`,
      { email, password }
    );

    if (!response.data.success) {
      throw new Error("[LOGIN] Backend bad response");
    }

    const login = response.data;

    const user = jwtDecode<TokenPayload>(login.token);

    return res.status(200).json({
      accessToken: login.token,
      refreshToken: login.refreshToken,
      user,
    });
  } catch (e) {
    console.error("[LOGIN ERROR]", e);

    return res.status(401).json({
      error: "Invalid credentials",
    });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS!;
const AUTH_PORT = process.env.AUTH_SERVICE_PORT!;

type RegisterResponse = {
  success: boolean;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const response = await axios.post<RegisterResponse>(
      `${BACKEND_ADDRESS}:${AUTH_PORT}/api/auth/register`,
      { email, password }
    );

    if (!response.data.success) {
      throw new Error("[REGISTER] Backend rejected request");
    }

    return res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error("[REGISTER ERROR]", e);

    return res.status(400).json({
      error: "Registration failed",
    });
  }
}

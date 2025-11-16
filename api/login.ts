import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (email !== "test@example.com" || password !== "123456") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.status(200).json({
    accessToken: "demo_access_token_" + Date.now(),
    refreshToken: "demo_refresh_token_" + Date.now(),
    user: {
      id: 1,
      email: "test@example.com",
      name: "Test User",
    },
  });
}

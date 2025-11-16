import { useState } from "react";
import api from "../api/client";
import { useAuth } from "../store";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

type ApiErrorResponse = {
  error: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);

  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", { email, password });
      login(res.data);
      navigate("/protected");
    } catch (err) {
      const message =
        (err as AxiosError<ApiErrorResponse>).response?.data?.error ||
        (err as Error).message ||
        "Login failed";

      setError(message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: 250 }}
      >
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

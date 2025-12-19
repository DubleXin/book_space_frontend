import { useState } from "react";
import { login as apiLogin } from "../api/auth";
import { useAuth } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    try {
      const data = await apiLogin(email, password);
      login(data);
      navigate("/me");
    } catch (err) {
      if (err) setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-2">
      <h1 className="text-xl font-semibold text-stone-950 dark:text-white">
        Log in
        <span className="text-stone-400 dark:text-stone-300">/</span>
        <Link
          className="text-blue-500 dark:text-blue-300 hover:underline"
          to="/register"
        >
          Sign up
        </Link>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          variant={isError ? "error" : "default"}
          required
          type="email"
          placeholder="user@bookspace.com"
          value={email}
          onChange={(e) => {
            setIsError(false);
            setEmail(e.target.value);
          }}
        />
        <Input
          variant={isError ? "error" : "default"}
          required
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => {
            setIsError(false);
            setPassword(e.target.value);
          }}
        />
        <Button
          variant={isLoading ? "ghost" : "primary"}
          type="submit"
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Next"}
        </Button>
      </form>
      {isError && (
        <p className="text-red-500 dark:text-red-300 text-sm">
          Failed to login, make sure that email and password are correct
        </p>
      )}
    </div>
  );
}

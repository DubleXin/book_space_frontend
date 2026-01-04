import { useState } from "react";
import { register as apiRegister } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<{
    isError: boolean;
    errorType: "default" | "password";
  }>({
    isError: false,
    errorType: "default",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      setError({
        isError: true,
        errorType: "password",
      });
      return;
    }
    setIsLoading(true);
    setError({
      isError: false,
      errorType: "default",
    });

    try {
      await apiRegister(email, password.password);
      navigate("/login");
    } catch {
      setError({
        isError: true,
        errorType: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-2">
      <h1 className="text-xl font-semibold text-stone-950 dark:text-white">
        <Link
          className="text-blue-500 dark:text-blue-300 hover:underline"
          to="/login"
        >
          Log in
        </Link>
        <span className="text-stone-400 dark:text-stone-300">/</span>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="user-email"
          autoComplete="email"
          variant={
            error.isError && error.errorType === "default" ? "error" : "default"
          }
          required
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setError({
              ...error,
              isError: false,
            });
            setEmail(e.target.value);
          }}
        />
        <Input
          id="user-new-password"
          autoComplete="new-password"
          variant={
            error.isError && error.errorType === "password"
              ? "error"
              : "default"
          }
          required
          type="password"
          placeholder="password"
          value={password.password}
          onChange={(e) => {
            setError({
              ...error,
              isError: false,
            });
            setPassword({
              ...password,
              password: e.target.value,
            });
          }}
        />
        <Input
          id="user-confirm-password"
          autoComplete="new-password"
          variant={
            error.isError && error.errorType === "password"
              ? "error"
              : "default"
          }
          required
          type="password"
          placeholder="confirm your password"
          value={password.confirmPassword}
          onChange={(e) => {
            setError({
              ...error,
              isError: false,
            });
            setPassword({
              ...password,
              confirmPassword: e.target.value,
            });
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
      {error.isError && (
        <p className="text-red-500 dark:text-red-300 text-sm">
          {(() => {
            switch (error.errorType) {
              case "default":
                return "Failed to register, please try again";
              case "password":
                return "Make sure that your passwords are the same";
              default:
                return "Failed to register";
            }
          })()}
        </p>
      )}
    </div>
  );
}

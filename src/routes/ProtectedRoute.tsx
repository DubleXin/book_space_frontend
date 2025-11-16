import { Navigate } from "react-router-dom";
import { useAuth } from "../store";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const user = useAuth((s) => s.user);

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

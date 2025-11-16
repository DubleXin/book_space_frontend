import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { HomePage, ServerlessTestPage, ExplorePage } from "../pages";
import ProtectedPage from "../pages/Protected";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "serverless",
        element: <ServerlessTestPage />,
      },
      {
        path: "protected",
        element: (
          <ProtectedRoute>
            <ProtectedPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

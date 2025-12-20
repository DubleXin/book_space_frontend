import { createBrowserRouter, Navigate } from "react-router-dom";
import NavbarLayout from "../layouts/NavbarLayout";
import { HomePage, ServerlessTestPage, ExplorePage } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
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
        path: "me",
        element: (
          <ProtectedRoute>
            <Profile />
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
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
